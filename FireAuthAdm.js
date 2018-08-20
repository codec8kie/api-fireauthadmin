import {_Fetch, setCookie} from './FireAuthAdmUtils';

/**
 * @see 함수목록
 * 
 * @method login         => 이메일 로그인
 * 
 * @method register      => 관리자 생성
 *
 * @method reAuth        => 개인정보 열람 위한 재인증 
 * @method checkId       => 아이디 중복 확인
 * @method resetPw       => 비밀번호 재설정
 * 
 * @method deleteAdm     => 관리자 삭제
 * @method updateAdm     => 관리자 정보 수정
 */


class FireAuthAdm {
  constructor(server, appName){
    
    this.server = server;

    this.getData(server + '/' + appName + '/restapi/admin_auth_desc')
  }
  // api 정보 불러오는 함수
  async getData(api_url){
    
    try {
      const res =  await _Fetch({method : 'GET', url : api_url});

      let obj = {};
      res.map(item => {
        obj[item.api_name] = {};
        obj[item.api_name]["url"]    = this.server + item.api;
        obj[item.api_name]["method"] = item.method;
        return true;
      });

      this.LOGIN_EMAIL    = obj ? obj.adm_login_admin : null;
      this.CHECK_EMAIL    = obj ? obj.adm_checkid : null;
      this.REGISTER       = obj ? obj.adm_register_admin : null;
      this.RESET_PW       = obj ? obj.adm_resetpw : null;
      this.AUTH_BY_PW     = obj ? obj.adm_check_user : null;
      this.DELETE_ADM     = obj ? obj.adm_delete_admin : null;     
      this.UPDATE_ADM     = obj ? obj.adm_update_admin : null;     
      
      
    } catch (error) {
      console.error(error);
    }
  }



  /*************************************************
   * @description 이메일 로그인
   * @property {id, pw} => 유저 id(email) 와 pw
   *************************************************/
  async login(id, pw) {
    const body = {
      id: id,
      pw: pw,
      typ_login: 1,
    }

    let res = await _Fetch(this.LOGIN_EMAIL, '', body);

    if(!res.results){
      setCookie('admData', res)
    }
    return res;
  }





  /*************************************************
   * @description 회원가입
   * @property {data} => 회원가입 정보 객체
   * 
   * bodyData를 회원가입 요구조건에 맞게 수정하여 사용할 것
   *************************************************/
  async register(bodyData) {

    let res = await _Fetch(this.REGISTER, '', bodyData);
    
    return res;
  }






  /*************************************************
   * @description 유저 계정인증
   * @property {id, pw, typ_login} => 유저 id & pw & typ_login
   * 
   * 개인정보 수정시 권한을 얻기위한 재인증 과정
   *************************************************/
 async reAuth(id, pw, typ_login){
    
    // 일반 로그인 재인증
    if(typ_login === 1){

      let res = await _Fetch(this.AUTH_BY_PW, '?id=' + id + '&&pw=' + pw);
      
      return res;

    }
  }




  /*************************************************
   * @description id 중복 확인
   * @property {id} => 유저 id
   *************************************************/
  async checkId(id){

    let res = await _Fetch(this.CHECK_EMAIL, '?id=' + id);

    return res;
    
  }




  /*************************************************
   * @description 비밀번호 재설정 메일 보내기
   * @property {email} => 유저 ID (가입에 사용되는 이메일)
   *************************************************/
  async resetPw(email){

    let res = await _Fetch(this.RESET_PW, '?email=' + email);

    return res;

  }



  /*************************************************
   * @description Adm 유저 삭제
   * @property {bodyData} => 관리자 삭제에 필요한 정보
   * bodyData = {
   *  uid : 
   *  pid :
   * }
   *************************************************/
  async deleteAdm(bodyData){

    let res = await _Fetch(this.DELETE_ADM, '', bodyData)

    return res;

  }




  /*************************************************
   * @description Adm 유저 정보 업데이트
   * @property {bodyData} => 관리자 업데이트에 필요한 정보
   * * bodyData = {
   *  uid : 
   *  pw :
   * }
   *************************************************/
  async updateAdm(bodyData){

    let res = await _Fetch(this.UPDATE_ADM, '', bodyData)
    return res;

  }
}
export default FireAuthAdm;