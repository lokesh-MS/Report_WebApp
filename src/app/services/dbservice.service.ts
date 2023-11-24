import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DbserviceService {
 LoginUrl='https://localhost/ReportWebApi/api/Login/authenticate';
//  SignupUrl='https://localhost/ReportWebApi/signUp';
 SignupUrl='https://localhost/ReportWebApi/api/signUp';
 RecordUrl="https://localhost/ReportWebApi/api/recordInfo";
//  FileUploadUrl='https://localhost:7205/UploadFile';
 FileUploadUrl='https://localhost/ReportWebApi/UploadFile';
//  FileDownloadUrl='https://localhost:7205/DownloadFile?filename='
 FileDownloadUrl='https://localhost/ReportWebApi/DownloadFile?filename='
// LoginUrl=' https://localhost:7205/api/Login'
  constructor( private http:HttpClient,) { }

LoginService(userData:any){
  return this.http.post(this.LoginUrl,userData);
}
SignUpService(userData:any){
  return this.http.post(this.SignupUrl,userData);
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
  debugger
  console.log( data);
  return this.http.post(this.FileUploadUrl,data,{responseType: 'text'});

}
DownLoadFile(data:any){
  debugger
  console.log( data);
  
  return this.http.get(this.FileDownloadUrl,data)
}
downloadFile(filename: string): Observable<Blob> {
  const url = `${this.FileDownloadUrl}${filename}`;

  // Set the responseType to 'blob' to handle binary data
  return this.http.get(url, { responseType: 'blob' });
}
}
