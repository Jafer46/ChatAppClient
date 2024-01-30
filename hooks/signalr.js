import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

 const hubUrl = 'http://localhost:5000/chathub';
//const hubUrl = 'https://c7d9-196-189-55-100.ngrok-free.app/chathub';
 const url = 'http://localhost:5000/Authentication'
//const url = 'https://c7d9-196-189-55-100.ngrok-free.app/Authentication'
let connection = null;

export const startConnectionWithToken = async (token) => {
  connection = new HubConnectionBuilder()
           .withUrl(`${hubUrl}?access_token=${token}`)
           .configureLogging(LogLevel.Information)
           .build()
           await connection.start()
           .then(() => console.log('SignalR connection started with token'))
           .catch((err) => console.error('Error starting SignalR connection:', err));
                   
}

const stopConnection = () => {
  connection.stop()
    .then(() => console.log('SignalR connection stopped'))
    .catch((err) => console.error('Error stopping SignalR connection:', err));
}

//signUp
export const createAccount = async (userName, email, password) => {
    
    try {
    const data = await axios.get(`${url}/SignUp?username=${userName}&email=${email}&password=${password}`)
    const id = data.data.id;
    const token = data.data.token;
    console.log("hello");
    console.log(data);
    if(token===null || token === undefined)
    {
      return null;
    }
    await startConnectionWithToken(token);
    if(connection === null || connection === undefined)
    {
      return null;
    }
    const newData = {userId:id,token: token}
    return newData;
    } catch (err) {
      console.error('Error creating account:', err);
      throw err;
    }
  }

// signIn

export const signIn = async (email, password) => {

  try {
    const data = await axios.get(`${url}/SignIn?email=${email}&password=${password}`)
    if(data === null || data === undefined){console.log("something went wrong");}
    console.log("signin successfuly")
    const userId = data.data.userId;
    const token = data.data.token;
    console.log(userId);
    if(token===null || token === undefined)
    {
      return null;
    }
    await startConnectionWithToken(token);
    if(connection === null|| connection=== undefined)
    {
      return null;
    }
    const newData = {userId:userId,token: token}
    return newData;
  } catch (err) {
    console.error('Error authenticating couldnt sign in:', err);
    throw err;
  }
}

export const getUserById = async (userId) => {
  if (connection === null) {
    return null;
  }

  try {
    const user = await connection.invoke("GetUserById", userId);
    return user;
  } catch (err) {
    console.log('couldnt find user: ', err);
    throw err; // Rethrow the error to be caught by the caller
  }
};

export const searchUser = async(query) => {
  if(connection === null){
    const token = AsyncStorage.getItem('token');
    startConnectionWithToken(token);
  }

  try{
    console.log(query)
    const users = await connection.invoke("SearchUser", query, 20);
    return users;
  }catch(err){
    console.log("search user has an error: ",err);
  }
}

export const getUserFreindes = async () => {
  if(connection === null){
    const token = AsyncStorage.getItem('token');
    startConnectionWithToken(token);
  }
  try{
    const freinds = await connection.invoke("GetFriends");
    return freinds;
  }catch(err){
    console.log("getuserfreinds has an error", err);
  }
}

export const isUserOnline = async (userId) => {
  if(connection === null){
    const token = AsyncStorage.getItem('token');
    startConnectionWithToken(token);
  }
  try{
    const isOnline = await connection.invoke("IsUserOnline", userId);
    return isOnline;
  }catch(err){
    console.log("is online function has error", err);
  }
}

export const isUserAdmin = async (userId) => {
  if(connection === null){
    const token = AsyncStorage.getItem('token');
    startConnectionWithToken(token);
  }
  try{
    const isOnline = await connection.invoke("IsUserAdmin", userId);
    return isOnline;
  }catch(err){
    console.log("is admin function has error", err);
  }
}
export const recieveMessage = async () => {
  if(connection === null){
    const token = AsyncStorage.getItem('token');
    startConnectionWithToken(token);
  }
  try{
     const message = await connection.on("RecieveMessage", (message) => {return message})
     return message;
  }catch(err){
    console.log("RecieveMessage is not working", err);
  }
}
export const createGroup = async (groupName) => {
  if(connection === null){
    const token = AsyncStorage.getItem('token');
    startConnectionWithToken(token);
  }
  try{
    const group = await connection.invoke("CreateGroup",groupName);
    return group;
  }catch(err){
    console.log("craete group has err: ",err);
  }
}

export const getUserGroup = async () => {
  if(connection === null){
    const token = AsyncStorage.getItem('token');
    startConnectionWithToken(token);
  }
  try{
    const groups = await connection.invoke("GetUsergroups");
    return groups;
  }catch(err){
    console.log("GetUserGroups has an error: ",err);
  }
}

export const addMessageHandler = (handler) => {
  connection.on('ReceiveMessage', handler);
};

export const sendMessage = async (text) => {
  const groupId = await AsyncStorage.getItem('groupId');
  const senderId = await AsyncStorage.getItem('userId');
  const recieverId = await AsyncStorage.getItem('freindId');
  return await connection.invoke("SendMessage", senderId,recieverId,groupId,text)
}
export const getGroupUsers = async () => {
  const groupId = await AsyncStorage.getItem('groupId')
  const users = await connection.invoke("GetGroupUsers", groupId)
  return users;
}
export const getGroupById = async () => {
  const data = await AsyncStorage.getItem('groupId')
  const group = await connection.invoke("GetGroupById", data);
  return group;
}
export const setMessageAsSeen = async (messageId) => {
  const result = await connection.invoke("SetMessageAsSeen", messageId);
  return result;
}
export const updateMessageHandler = (handler) => {
  connection.on('UpdateMessage', handler);
};
export const isUserFreind = async (userId) => {
  try {
    const res = await connection.invoke("IsFreind",userId);
    return res;
  } catch (err) {
    console.log("isUserFreind function has an error: ",err);
  }
}
export const addFreind = async (userId) => {
  try {
    const res = await connection.invoke("AddFriend",userId);
    return res;
  } catch (err) {
    console.log("isUserFreind function has an error: ",err);
  }
} 
export {connection};