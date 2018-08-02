# api-userauth

* Github 주소 => [링크](https://github.com/BazerHanMinSu/api-userauth#1-loginid-pw)

=============

회원관리 및 인증에 필요한 기능들을 모아놓은 고객 페이지용 class와 관리자 페이지용 class

> updated at 2018-7-29
***


목차
---
#### 1. api 메소드 구성 
#### 2. 사용법 및 상세정보
#### 3. 업데이트 내역
***

## 1. api 메소드 구성

### (1) UserAuth.js
>일반 및 연동(구글, 페이스북 등) 회원 인증 기능을 가진 class (주로 일반 웹페이지용)
+ fbLogin
+ googleLogin
+ login
+ signUp
+ cancelAccount
+ cancelAccountAuth
+ reAuth
+ checkId
+ verifyUser
+ resetPw

### (2) AdmAuth.js
>일반 회원 인증 기능을 가진 class (주로 관리자용)
+ login
+ register
+ cancelAccount
+ reAuth
+ checkId
+ resetPw
+ deleteAdm
+ updateAdm


## 2. 사용법 및 상세정보

### (1). 인스턴스 선언

```javascript

let server = "http://192.168.0.15:7410";
let appName = "test_module";

let config = {
  apiKey: "AIzaSyCZPJ7Qfeo7RPhnmsLfY_dhUJF32QqK_aA",
  authDomain: "user-mange-test.firebaseapp.com",
  databaseURL: "https://user-mange-test.firebaseio.com",
  projectId: "user-mange-test",
  storageBucket: "",
  messagingSenderId: "53964943217"
};

// admAuth도 동일
let userAuth = new userAuth(server, appName, config);
```

+ server 

서버의 주소 (문자열 마지막의 '/' 붙이지 않음)

+ appName 

api 정보를 가져올 서버의 앱 이름

+ config

firebase 설정 객체

### (2). 메소드별 상세정보

```javascript
// login()을 사용하는 예시
async login(id, pw){
    
  const res = await this.AdmAuth.login(id , pw)

  // 정상적으로 fetch한 경우
  if(!res.hasOwnProperty('results')){
    console.log(res);
    setCookie('admAuth',JSON.stringify(res))
    window.location.reload();
  }
  // 에러가 발견된 경우
  else{ 
    alert(res.results);
  }
}
```

### 1. login(id, pw)

일반 이메일 로그인

>id : 아이디(이메일), pw : 비밀번호


### 2. googleLogin()

구글 연동 로그인

### 3. fbLogin()

페이스북 연동 로그인

### 4. signUp(bodyData)

회원가입(일반, 연동 통합)

>bodyData : 회원가입 POST에 쓰일 body 객체. 기본 객체 구성은 다음과 같으며 프로젝트 별 요구사항에 따라 바뀔 수 있음

>!! 연동 로그인의 경우 id와 pw는 기입할 필요가 없음(해당 값에 null을 삽입하여도 무관)

```javascript
// UserAuth
let bodyData = {
  user: {
    id        : tmp,
    user_name : tmp,
    user_type : tmp,
  },
  user_auth: {
    typ_login : tmp,
    pw        : tmp,
  },
}  

// AdmAuth
let bodyData = {
  adm: {
    id        : tmp,
    user_name : tmp,
    user_type : tmp,
  },
  adm_auth: {
    typ_login : tmp,
    pw        : tmp,
  },
}   
```
### 5. cancelAccount(bodyData)

계정 탈퇴(일반)

>bodyData : 탈퇴에 필요한 body 객체.

```javascript
let bodyData = {
  pw       : tmp,
  uid      : tmp,
  pid_user : tmp,
}
```

### 6. cancelAccountAuth(bodyData)

계정 탈퇴(연동)

>bodyData : 탈퇴에 필요한 body 객체.

```javascript
let bodyData = {
  uid      : tmp,
  pid_user : tmp,
}
```

### 7. reAuth(id, pw, typ_login)

재인증(일반, 연동 통합)

>id : 아이디(이메일), pw : 비밀번호, typ_login(로그인 타입)

> !! 연동 계정일 경우에는 pw값은 입력할 필요가 없음

### 8. checkId(id)

아이디 중복검사

>id : 아이디(이메일)

### 9. resetPw(email)

비밀번호 재설정 메일 발송

>email : 이메일

### 10. verifyUser(id, pw)

이메일 인증을 위한 메일 전송

>id : 이메일, pw : 비밀번호

***

## 3. 업데이트 내역

2018-7-25 => 첫 버전 업로드
2018-7-29 => README 목차 및 (2).4 회원가입 부분 설명 수정
2018-8-02 => README 수정 및 폴더 생성하여 안에 수정된 js파일과 fetch파일 생성