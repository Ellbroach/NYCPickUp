import firebase from '../screens/LoginScreen'
import moment from 'moment';
import * as path from 'path';

const database = firebase.database();


export const createField = ({ id, name, people, messages = [] }) => ({
    type: 'CREATE_FIELD',
    room: {
      id,
      name,
      people,
      messages
    }
  });

  export const startField = (roomper = {}, showCreateError) => {
    return (dispatch, getState) => {
      const field = {
        name: roomper.name,
      }
      return database.ref('fields').once('value', (snapshot) => {
        const fields = [];
        snapshot.forEach((childSnapshot) => {
          fields.push({
            ...childSnapshot.val()
          });
        });
        if (!fields.find((f) => f.name === field.name)) {
          return database.ref(`fields/${field.name}`).set(field).then((ref) => {
            return database.ref(`fields/${field.name}/people/${roomper.people.id}`).set(roomper.people).then(() => {
              database.ref(`users/${roomper.people.id}/fields/${field.name}`).set({ fieldName: field.name });
  
              dispatch(createField({
                ...roomper,
                people: [roomper.people]
              }));
              const perName = roomper.people.name;
              dispatch(startSendMessage(`${perName} is first to the field`, field.name, true)).then(() => {
                dispatch(startListening(field.name));
                history.push(`/field/${field.name}`);
              });
            });
          });
        } else {
          return showCreateError('Field is not available!');
        }
  
      });
    };
  };



  export const sendMessage = (message, roomName) => ({
    type: 'SEND_MESSAGE',
    message,
    fieldName
  });

  export const startSendMessage = (text, fieldName, status = false) => {
    return (dispatch, getState) => {
      const user = getState().auth;
      if (user) {
        const uid = user.uid;
        const displayName = user.displayName;
        const message = {
          sender: { uid, displayName },
          text,
          createdAt: moment().format(),
          status
        };
        return database.ref(`fields/${fieldName}/messages`).push(message);
      }
    };
  };