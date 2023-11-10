import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DbserviceService {
 LoginUrl='https://localhost:7205/api/Login/authenticate';
 SignupUrl='https://localhost:7205/api/signUp';
 RecordUrl="https://localhost:7205/api/recordInfo";
 FileUploadUrl='https://localhost:7205/UploadFile';
 FileDownloadUrl='https://localhost:7205/DownloadFile'
// LoginUrl=' https://localhost:7205/api/Login'
  constructor( private http:HttpClient,) { }

LoginService(userData:any){
  return this.http.post(this.LoginUrl,userData);
}
SignUpService(userData:any){
  return this.http.post(this.SignupUrl,userData);
}
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
InsertRecordServices(record:any){
  return this.http.post(this.RecordUrl,record);
}
GetAllRecordServices(){
  return this.http.get(this.RecordUrl);
}
GetSingleRecordService(id:any){
  return this.http.get(this.RecordUrl+'/'+id)
}
Store_Id_Service(id:any){
return sessionStorage.setItem('Id',id);
}
Get_Id(){
  return sessionStorage.getItem('Id');
}

UpdateRecordService(id:any,data:any){
  debugger
return this.http.put(this.RecordUrl+'/'+id,data);
}

DeleteRecordService(id:any){
return this.http.delete(this.RecordUrl+'/'+id,{responseType: 'text'})
}
UploadFile(data: any) {

  return this.http.post(this.FileUploadUrl,data,{responseType: 'text'});

}
DownLoadFile(){
  return this.http.get(this.FileDownloadUrl,{responseType: 'text'})
}
StoreFileName(fileName:any){
  return sessionStorage.setItem('FileName',fileName)
}

GetFileName(){
  return sessionStorage.getItem('FileName')
}
}
