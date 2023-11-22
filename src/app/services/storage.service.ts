import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }


  StoreToken(tokenValue:any){
    sessionStorage.setItem('token', tokenValue);
  }
  GetToken(){
    return sessionStorage.getItem('token')
  }
  StoreUser(Username:any){
    sessionStorage.setItem('userName',Username)
  }
  GetUser(){
    return sessionStorage.getItem('userName')
  }
  SetFileErrMess(mess:any){
    return sessionStorage.setItem('fileErrMess',mess)
  }
  GetFileErrMess(){
    return sessionStorage.getItem('fileErrMess')
  }
  StoreFileName(fileName:any){
    return sessionStorage.setItem('FileName',fileName)
  }
  
  GetFileName(){
    return sessionStorage.getItem('FileName')
  }
  String_Search_Setbool(bool:any){
    return sessionStorage.setItem('strSearchValue',bool);
  }
String_Search_Getbool(){
  return sessionStorage.getItem('strSearchValue');
}
}
