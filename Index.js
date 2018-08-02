import React, {Component} from 'react';
import styled from 'styled-components';

import {_Fetch, getCookie, setCookie} from './FireAuthAdmUtils';

import FireAuthAdm from './FireAuthAdm';

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // 로그인
      id : '',
      pw : '',

      isLogin: false,

      // 관리자 생성
      typ_login : 1,      
      joinId    : '',
      joinPw    : '',
      pwAgain : '',
      name    : '',

      isValidId : false,

      // 관리자 삭제
      admList : [],
      admAuthList: [],

      // 관리자 수정
      modiPw: '',

      //경고멘트
      warning: '',
    }

    var config = {
      apiKey: "AIzaSyAuH7rEeabNtxXSmYJNjqjiCYy8e1F18as",
      authDomain: "admin-manage-test.firebaseapp.com",
      databaseURL: "https://admin-manage-test.firebaseio.com",
      projectId: "admin-manage-test",
      storageBucket: "admin-manage-test.appspot.com",
      messagingSenderId: "703278878183"
    };
    
    // setCookie('admAuth', '');
    this.FireAuthAdm = new FireAuthAdm("http://192.168.0.15:7410","test_module",config);
    this.admAuth = getCookie('admAuth') ? JSON.parse(getCookie('admAuth')) : false;
    
    console.log(this.admAuth);
  }
  componentDidMount(){
    if(this.admAuth){
      this.getList();
    }
  }
  // 관리자 목록을 불러옴
  async getList(){
    try{
      let res = await _Fetch({method: "GET", url : "http://192.168.0.15:7410/test_module/restapi/adm/get_admin"})

      console.log(res);
      this.setState({
        admList : res.adm,
        admAuthList : res.adm_auth,
      })
    }
    catch(e){
      console.log(e);
      this.setState({
        warning : 'Master 관리자만 리스트를 불러올 수 있습니다.'
      })
      alert(e.results);
    }
  }
  async login(id, pw){
    
    const res = await this.FireAuthAdm.login(id , pw)

    if(!res.hasOwnProperty('results')){
      console.log(res);
      setCookie('admAuth',JSON.stringify(res))
      window.location.reload();
    }
    else{ 
      alert(res.results);
    }
  }
  logout(){
    setCookie('admAuth', '');
    window.location.reload();
  }
  async register(){
    if(!this.state.isValidId){
      alert('아이디를 확인해주세요');
      return;
    }
    let bodyData = {
      adm: {
        id        : this.state.joinId,
        user_name : this.state.name,
        user_type : "manager",
      },
      adm_auth: {
        typ_login : this.state.typ_login,
        pw        : this.state.joinPw,
      },
    }  

    
    const res = await this.FireAuthAdm.register(bodyData)
  
    if(!res.hasOwnProperty('results')){
      alert('가입 성공')
    }
    else{ 
      alert(res.results);
    }
  }
  async checkId(id){
    const res = await this.FireAuthAdm.checkId(id)
      
    if(!res.hasOwnProperty('results')){
      alert('사용 가능')
      this.setState({isValidId : true});
    }
    else{ 
      alert(res.results);
    }
  }
  async deleteAdm(key){
    if(!window.confirm(this.state.admList[key].id + "를 삭제할까요?")){
      return;
    }
    let bodyData = {
      uid      : this.state.admAuthList[key].uid,
      pid      : this.state.admList[key].pid_adm,
    };
    
    const res = await this.FireAuthAdm.deleteAdm(bodyData)

    if(!res.hasOwnProperty('results')){
      alert('삭제 성공')
    }
    else{ 
      alert(res.results);
    }
  }
  async reAuth(id, pw, typ_login){
        
    const res = await this.FireAuthAdm.reAuth(id, pw, typ_login)
    
    if(!res.hasOwnProperty('results')){
      alert('인증 성공');
      this.setState({deleteSelected: true});
    }
    else{ 
      alert(res.results);
    }
  }
  async updateAdm(key){
    if(!window.confirm(this.state.admList[key].id + "의 비밀번호를 위와같이 수정할까요?")){
      return;
    }
    let bodyData = {
      uid     : this.state.admAuthList[key].uid,
      pw      : this.state.modiPw,
    };
    
    const res = await this.FireAuthAdm.updateAdm(bodyData)

    if(!res.hasOwnProperty('results')){
      alert('수정 성공')
    }
    else{ 
      alert(res.results);
    }
  }
  renderLoginBox(){
    if(this.admAuth){
      return(
        <VerticalBox>
          <h1>{this.admAuth.adm.user_name}님 로그인 환영</h1>
            <HorizonBox>
              <Bt1 onClick = {() => this.logout()}>
                로그아웃
              </Bt1>
            </HorizonBox>
        </VerticalBox>
      )
    }
    else{
      return(
        <VerticalBox>
          <HorizonBox>
            <Label>아이디</Label>
            <Input type = "text" 
                   value = {this.state.id}
                   onChange = {(e) => this.setState({id : e.target.value})}/>
          </HorizonBox>

          <HorizonBox>
            <Label>비밀번호</Label>
            <Input type = "password" 
                   value = {this.state.pw}
                   onChange = {(e) => this.setState({pw : e.target.value})}/>
          </HorizonBox>

          <Bt1 onClick = {() => this.login(this.state.id , this.state.pw)}>
            로그인
          </Bt1>
        </VerticalBox>
      )
    }
  }
  renderCreateBox(){
    return(
      <VerticalBox>

        <HorizonBox2>
          <Label>아이디</Label>
          <Input type = "text" 
                 value = {this.state.joinId}
                 onChange = {(e) => this.setState({isValidId: false, joinId : e.target.value})}/>
          <AuthId onClick = {() => this.checkId(this.state.joinId)}>
            중복확인
          </AuthId>
        </HorizonBox2>

        <HorizonBox2>
          <Label>비밀번호</Label>
          <Input type = "password" 
                 value = {this.state.joinPw}
                 onChange = {(e) => this.setState({joinPw : e.target.value})}/>
        </HorizonBox2>

        <HorizonBox2>
          <Label>바밀번호 확인</Label>
          <Input type = "password"  
                 value = {this.state.pwAgain}
                 onChange = {(e) => this.setState({pwAgain : e.target.value})}/>
        </HorizonBox2>

        <HorizonBox2>
          <Label>이름</Label>
          <Input type = "text" 
                 value = {this.state.name}
                 onChange = {(e) => this.setState({name : e.target.value})}/>
        </HorizonBox2>

        <SubmitBt onClick = {() => this.register({...this.state})}>
          가입시키기
        </SubmitBt>
      </VerticalBox>
    )
  }
  renderDeleteBox(){
    return(
      <VerticalBox>
        <ListItem>{this.state.warning}</ListItem>
        {(() => {
          let admList = this.state.admList;
          let arr = [];

          for(let key in admList ){
            arr.push(
              <ListItem key = {key} onClick = {() => this.deleteAdm(key)}>
                {admList[key].id}<br/>
              </ListItem>
            )
          }
          return arr;
        })()}

      </VerticalBox>
    );
  }
  renderUpdateBox(){
    return(
      <VerticalBox>
        <HorizonBox>
          <Label>비밀번호</Label>
          <Input type = "password"
                 value = {this.state.modiPw}
                 onChange= {(e) => this.setState({modiPw: e.target.value})}/>
        </HorizonBox>
        <ListItem>{this.state.warning}</ListItem>
        {(() => {
          let admList = this.state.admList;
          let arr = [];

          for(let key in admList ){
            arr.push(
              <ListItem key = {key} onClick = {() => this.updateAdm(key)}>
                {admList[key].id}<br/>
              </ListItem>
            )
          }
          return arr;
        })()}

      </VerticalBox>
    );
  }
  render() {
    return(
      <IndexBox>
        <Title>로그인/로그아웃</Title>
        {this.renderLoginBox()}
        <Title>관리자 생성</Title>
        {this.renderCreateBox()}
        <Title>관리자 리스트에서 선택 삭제</Title>
        {this.renderDeleteBox()}
        <Title>관리자 리스트에서 선택 수정</Title>
        {this.renderUpdateBox()}
        
      </IndexBox>
    );
  }
}

const IndexBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-bottom: 20px;
`
const ListItem = styled.div`
  padding: 6px;
  cursor: pointer;
`
const Title = styled.div`
  font-size: 24px;

  margin-top: 20px;
`
const VerticalBox = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid gray;

  margin-top: 30px;

  padding: 5%;
`
const HorizonBox = styled.div`
  width: 450px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 20px;
  margin-bottom: 20px;
`
const Input = styled.input`
  width: 300px;
  height: 30px;
  font-size: 18px;
`
const Bt1 = styled.div`
  width: 450px;
  font-size: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #000000;
  cursor: pointer;

  margin-right: 5px;
  margin-left: 5px;
  margin-bottom: 10px;

  padding: 5px;
`
const HorizonBox2 = styled.div`
  width: 500px;
  display: flex;
  align-items: center;

  margin-top: 20px;
  margin-bottom: 20px;
`

const Label = styled.div`
  width: 100px;
  font-size: 16px;
`


const SubmitBt = styled.div`
  width: 200px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #0f0f0f;
  cursor: pointer;

  margin-top: 30px;
`
const AuthId = styled.div`
  width: 60px;
  height: 30px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #000000;
  cursor : pointer;

  margin-left: 15px;
`
export default Index;