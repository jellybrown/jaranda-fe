// const userData = new UserSotrage('userData'); -> 회원가입한 유저 데이터 사용
// const currentUser = new UserStorage('currentUser'); -> 현재 유저 데이터 사용

export class UserStorage {
  constructor(name) {
    this.name = name;
    this.userList = this.getAll();
  }

  // 아이템을 넘겨주면 LocalStorage에 Object로 저장
  save(item) {
    if (this._checkExistId(item.id)) {
      console.log('존재');
      return;
    }
    this.userList.push(item);
    const result = this._changeToObject(this.userList);
    this._setDataAtStorage(result);
  }

  update(item) {
    this.userList.push(item);
    console.log('-->', this.userList);
    const result = this._changeToObject(this.userList);
    this._setDataAtStorage(result);
  }

  // LocalStorage의 모든 정보를 Array로 리턴
  getAll() {
    const data = this._getDataFromStorage(); // obj
    if (!data) return [];
    const result = this._changeToArray(data);

    return result;
  }

  // localStorage 데이터 교체
  replaceAll(arr) {
    localStorage.removeItem(this.name);
    const result = this._changeToObject(arr);
    this._setDataAtStorage(result);
    //localStorage.setItem(this.name, JSON.stringify(arr));
  }

  getUser() {
    if (this.name !== 'currentUser') throw new Error(errorMessage(this.name));
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return user || null;
  }

  login(user) {
    if (this.name !== 'currentUser') throw new Error(errorMessage(this.name));
    localStorage.setItem(this.name, JSON.stringify(user));
  }

  logout() {
    if (this.name !== 'currentUser') throw new Error(errorMessage(this.name));
    localStorage.removeItem('currentUser');
  }

  _getDataFromStorage() {
    return JSON.parse(localStorage.getItem(this.name));
  }

  _setDataAtStorage(obj) {
    localStorage.setItem(this.name, JSON.stringify(obj));
  }

  _checkExistId(newId) {
    const arr = this.getAll();
    const isExist = arr.some(item => item.id === newId);

    return isExist;
  }

  _changeToArray(obj) {
    const arr = Object.keys(obj).map(key => {
      const item = {
        id: obj[key].id,
        name: obj[key].name,
        password: obj[key].password,
        address: obj[key].address,
        role: obj[key].role,
        age: obj[key].age,
        card: { ...obj[key].card },
      };
      return item;
    });

    return arr;
  }

  _changeToObject(arr) {
    let result = {};
    arr.forEach(item => {
      result[item.id] = {
        id: item.id,
        name: item.name,
        password: item.password,
        address: item.address,
        role: item.role,
        age: item.age,
        card: { ...item.card },
      };
    });

    return result;
  }
}

const errorMessage = name => {
  return `선언 이름을 확인해주세요. : ${name}`;
};
