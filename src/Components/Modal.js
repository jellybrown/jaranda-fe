/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, Title } from '../pages/admin/admin.style';
import { UserStorage } from '../utils/userStorage';

const Modal = ({ setTableData, updateData, setUpdateModal }) => {
  const formRef = useRef(null);
  const [name, setName] = useState(updateData.name);
  const [password, setPassword] = useState(updateData.password);
  const [address, setAddress] = useState(updateData.address);
  const [role, setRole] = useState(updateData.role);
  const [age, setAge] = useState(updateData.age);
  const storageRef = useRef();
  storageRef.current = new UserStorage('userData');

  const handleClickSave = () => {
    const newItem = {
      id: updateData.id,
      name,
      password,
      address,
      role,
      age,
      card: updateData.card,
    };
    storageRef.current.update(newItem);
    setTableData(storageRef.current.getAll());
    setUpdateModal(false);
  };

  const handleClickClose = useCallback(() => {
    setUpdateModal(false);
  }, []);

  if (updateData?.id) {
    return (
      <Container>
        <FormContainer>
          <Title style={{ margin: '30px 0px' }}>유저 정보 관리</Title>
          <Form ref={formRef}>
            <InputGroup>
              <Label>이름</Label>
              <input type="text" defaultValue={name} onChange={e => setName(e.target.value)} />
            </InputGroup>
            <InputGroup>
              <Label>Password</Label>
              <input
                type="text"
                defaultValue={password}
                onChange={e => setPassword(e.target.value)}
                minLength={6}
                maxLength={12}
              />
            </InputGroup>
            <InputGroup>
              <Label>Address</Label>
              <input
                type="text"
                defaultValue={address}
                onChange={e => setAddress(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <Label>권한</Label>
              <input type="text" defaultValue={role} onChange={e => setRole(e.target.value)} />
            </InputGroup>
            <InputGroup>
              <Label>Age</Label>
              <input type="text" defaultValue={age} onChange={e => setAge(e.target.value)} />
            </InputGroup>
            <BtnGroup>
              <Button gray onClick={handleClickClose}>
                취소
              </Button>
              <Button onClick={handleClickSave}>확인</Button>
            </BtnGroup>
          </Form>
        </FormContainer>
      </Container>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default Modal;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #626262;
`;

const FormContainer = styled.div`
  text-align: center;
  background-color: #fff;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 70%;
  border-radius: 10px;
  padding: 20px 20px 0px 20px;
`;

const Form = styled.div``;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  label {
    font-weight: bold;
    margin: 20px;
  }
  input {
    padding: 15px 30px;
    border-radius: 10px;
    border: 1px solid #e0e0e0;
    margin: 5px 20px;
  }
`;

const Label = styled.label`
  width: 100px;
`;

const BtnGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  Button {
    margin: 25px 30px;
  }
`;
