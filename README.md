# api-fireauthadmin

회원관리 및 인증에 필요한 기능들을 모아놓은 관리자 페이지용 class

* !! Github 주소 => [링크](https://github.com/BazerHanMinSu/api-fireauthadmin)

> recently updated at 2018-9-4

| 파일명 | 설명 |
| ------ | ----------- |
| FireAuthAdm.js | API 파일 |
| FireAuthAdmUtils.js | API 파일에만 쓰이는 util 함수 모음 |
| Index.js | fb-component에서 시현을 위한 파일 |
| README.md | 설명 파일 |

***


목차
---
#### 1. api 메소드 구성 
#### 2. 사용법 및 상세정보
#### 3. 업데이트 내역
***

## 1. api 메소드 구성

### FireAuthAdm.js

>관리자 인증 기능을 가진 class 
+ login
+ register
+ reAuth
+ checkId
+ resetPw
+ admAdm
+ deleteAdm
+ deleteUser
+ updateAdm


## 2. 사용법 및 상세정보

### (1). 인스턴스 선언

```javascript
import FireAuthAdm from '../../common/FireAuthAdm';

let server = "http://192.168.0.15:7410";
let appName = "test_module";

let FireAuthAdm = new FireAuthAdm(server, appName);
```

+ server 

서버의 주소 (문자열 마지막의 '/' 붙이지 않음)

+ appName 

api 정보를 가져올 서버의 앱 이름

+ config

firebase 설정 객체
### (2). 사용되는 쿠키 정보
+ 내부적으로 로그인 정보를 추출할 쿠키명이 'admAuth'로 지정되어있음

+ 따라서 1. 사용자가 로그인 후 받아오는 유저정보 데이터를 위와 같이 'admAuth'인 쿠키명으로 저장하거나

+ 혹은 2. FireAuthAdmUtils.js 로 가서 해당 쿠키명을 커스텀하여 사용할 수 있음


### (3). 메소드별 상세정보 

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

__(return)__
>성공 : 성공 문구

>실패 : adm, adm_auth 등의 정보가 담긴 객체 

### 2. register(bodyData)

회원가입

__(parameter)__
>bodyData : 회원가입 POST에 쓰일 body 객체. 기본 객체 구성은 다음과 같으며 프로젝트 별 요구사항에 따라 바뀔 수 있음

```javascript

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

__(return)__
>성공 : 성공 문구

>실패 : {status : 에러코드, results : 에러메세지}


### 3. reAuth(id, pw, typ_login)

재인증

__(parameter)__
>id : 아이디(이메일), pw : 비밀번호, typ_login(로그인 타입)

### 4. checkId(id)

아이디 중복검사

__(parameter)__
>id : 아이디(이메일)

__(return)__
>성공 : 사용 가능

>실패 : {status : 에러코드, results : 에러메세지}

### 5. resetPw(email)

관리자 비밀번호 재설정

__(parameter)__
>email : 아이디(이메일)

__(return)__
>성공 : 사용 가능

>실패 : {status : 에러코드, results : 에러메세지}

### 6. getAdm()

관리자 목록 불러오기

__(parameter)__
>-

__(return)__
>성공 : 사용 가능

>실패 : {status : 에러코드, results : 에러메세지}

### 7. deleteAdm(bodyData)

마스터 관리자가 다른 관리자들을 삭제

__(parameter)__
>bodyData : 관리자 삭제에 필요한 bodyData

```javascript
let bodyData = {
  uid : tmp,
  pid : tmp,
}
```

### 8. deleteUser(bodyData)

관리자가 일반유저 삭제

__(parameter)__
>bodyData : 일반유저 삭제에 필요한 bodyData

```javascript
let bodyData = {
  uid : tmp,
  pid : tmp,
}
```

__(return)__
>성공 : 성공 문구

>실패 : {status : 에러코드, results : 에러메세지}

### 9. updateAdm(id, pw)

마스터 관리자가 다른 관리자들을 업데이트 (현재는 비밀번호만)

__(parameter)__
>bodyData : 관리자 업데이트에 필요한 bodyData

```javascript
let bodyData = {
  uid : tmp,
  pw  : tmp,
}
```

__(return)__
>성공 : 성공 문구

>실패 : {status : 에러코드, results : 에러메세지}

***

## 3. 업데이트 내역

2018-7-25 => 첫 버전 업로드

2018-7-29 => README 목차 및 (2).4 회원가입 부분 설명 수정

2018-8-02 => README 수정 및 수정된 js파일과 utils파일 생성

2018-8-29 => 7.delteUser 추가 및 README 갱신

2018-9-3  => README 수정

2018-9-3  => FireAuthAdmUtils 수정 및  README 수정