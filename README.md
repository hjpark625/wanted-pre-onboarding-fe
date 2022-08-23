# 🚀 Wanted Pre-Onboarding FE

## ⚙️ 프로젝트 실행 방법

    1. git clone https://github.com/hjpark625/wanted-pre-onboarding-fe.git
    2. cd wanted-pre-onboarding-fe
    3. npm install
    4. npm start

---

## ⌨️ 사용 기술 스택

![react](https://img.shields.io/badge/react-18.2.0-61DAFB?logo=react)
![typescript](https://img.shields.io/badge/typescript-4.7.4-3178C6?logo=typescript)
![styledComponents](https://img.shields.io/badge/styled--components-5.3.5-DB7093?logo=styledcomponents)
![axios](https://img.shields.io/badge/axios-0.27.2-5E22D6)
![react-router-dom](https://img.shields.io/badge/react--router--dom-6.3.0-blue?logo=react-router)

---

## 🎥 시연영상

### 1️⃣ 로그인 및 회원가입 페이지

1. 로그인 및 회원가입 영상

   ![로그인 회원가입(gif)](https://user-images.githubusercontent.com/97019802/186090073-14c5e5d3-d6fe-4d91-8150-9edfe5a7f690.gif)

2. 토큰 유무에 따른 리다이렉트 시연영상

   ![토큰 리다이렉트(gif)](https://user-images.githubusercontent.com/97019802/186090083-21127c3b-c5b1-4dc6-b42c-0098919bf3ad.gif)

### 2️⃣ Todo 만들기

1. Todo CRUD 시연영상

   ![Todo CRUD(gif)](https://user-images.githubusercontent.com/97019802/186090087-8a21604b-093e-4593-9c97-d5f9b42b57de.gif)

---

## 🔧 구현 기능

> ### 구현 해야 할 필수 기능
>
> 1. 로그인 / 회원가입
>
>    - '/' 경로에 로그인 및 회원가입 기능 구현
>    - 페이지 안에 이메일 입력창, 비밀번호 입력창, 제출 버튼이 포함된 형태 구성
>    - 이메일 및 비밀번호 유효성 검사 기능 구현
>      - 이메일: `@`포함
>      - 비밀번호: 8자 이상
>      - 이메일과 비밀번호가 위 조건을 갖췄을 때 활성화
>    - 로그인 API호출 후 올바른 응답을 받을 때 `/todo`경로로 이동
>      - 로그인 성공 시 JWT를 로컬스토리지에 저장
>    - 로그인 여부에 따른 리다이렉트 구현
>      - 토큰이 있을 때 `/`페이지에 접속시 `/todo`로 리다이렉트
>      - 토큰이 없을 때 `/todo`페이지에 접속시 `/`로 리다이렉트
>
> 2. Todo List
>    - `/todo`에 접속하면 todo 목록 렌더링
>    - 리스트 페이지에 todo list의 내용과 완료 여부가 표시되어야 함
>    - 리스트 페이지에 입력창, 추가버튼이 있으며 추가 버튼을 누르면 입력창의 내용이 새로운 todo list로 추가
>    - todo list의 수정, 삭제 기능 구현
>      - todo list 개별 아이템 우측에 수정버튼 존재하고 클릭 시 수정모드 활성화하고 수정이 가능 하도록 구현
>      - 수정모드에서 개별 아이템 우측에 제출버튼과 취소버튼이 표시되면서 버튼을 통해 수정내용을 제출, 수정을 취소하도록 구현
>      - todo list 개별 아이템 우측에 삭제버튼 존재하고 클릭 시 삭제가 되도록 구현

### 1️⃣ 로그인 / 회원가입

1. 회원가입 페이지

   - 회원가입 시 이메일과 비밀번호를 입력할 때 경고메시지를 출력하여 유저가 올바른 정보를 입력할 수 있도록 유도
     - 조건이 불일치 할 경우 제출 버튼이 비활성화
       - 버튼에 `disabled`속성 부여
       - `cursor: not-allowed`와 버튼 배경색을 회색으로 세팅
   - `/` 단일경로 내에 `type`을 설정하여 회원가입 버튼과 로그인 버튼을 눌렀을 때 조건부 렌더링을 통해 목적에 맞는 페이지 렌더링

2. 로그인 페이지
   - 회원가입과 마찬가지로 경고메시지를 출력해 유저가 올바른 정보를 입력할 수 있도록 유도
     - 조건불일치 시 회원가입과 동일한 속성 적용
   - 로그인 성공 시 `/todo`페이지로 이동

### 2️⃣ 토큰 유무에 따른 페이지 리다이렉팅

1. 렌더링이 되는 페이지상에 로컬스토리지에 저장된 토큰의 유무를 판단해 `/` 혹은 `/todo`로 리다이렉팅 구현

   ```tsx
   // 토큰이 있을 때 로그인 페이지 접속 시(main.tsx)
   const token = localStorage.getItem('access_token');

   const checkToken = () => {
     token && navigate('/todo');
   };

   useEffect(() => {
     checkToken();
   }, []);

   // 토큰이 없을 때 todo 페이지 접속 시(todo.tsx)
   const token = localStorage.getItem('access_token');

   const checkToken = () => {
     !token && navigate('/');
   };

   useEffect(() => {
     checkToken();
   }, []);
   ```

### 3️⃣ TODO CRUD

1. Create(TodoInsert.tsx)

   - `setTodoValue`를 활용해 input태그의 입력값을 저장
   - 저장한 입력값을 onSubmit 함수에 `POST`로 API요청문 작성
     - `async / await`을 통해 `post`요청이 완료되면 전송이 완료되면 새롭게 추가된 데이터를 다시 `GET`요청으로 받아오기
   - `GET`요청으로 받은 데이터를 통해 다시 렌더링 하게끔 기능 구현

2. Read(Todo.tsx & TodoList.tsx + TodoListItem.tsx)

   - Todo.tsx에 서버 요청 시 들어오는 todo 데이터를 저장하기 위한 state 설정
     - 페이지가 나타날 때 데이터를 받아와야하기 때문에 `useEffect`를 활용하여 최초 렌더링 될 때 `GET`요청으로 데이터를 받아 `setTodo`에 저장
   - 저장된 todo데이터를 TodoList.tsx에 props로 전달
     - 전달받은 데이터를 `map`을 통하여 렌더링
   - TodoListItem.tsx에 최종적으로 데이터들을 전달하여 렌더링

3. Update(TodoListItem.tsx)

   - 수정버튼을 각 렌더링 되는 데이터 우측에 제작하여 수정버튼 클릭시 input창이 나오게끔 구현
     - 수정하는 사항임을 알게 하기위해 수정버튼 클릭 시 회색으로 바뀌고 input창의 글자가 회색으로 변경
     - 수정완료 시(enter를 쳤을 때) 바로 `PUT`요청을 보냄
       - `PUT`요청 완료시 `Create`때와 마찬가지로 바뀌는 데이터를 `GET`요청으로 받아서 마찬가지로 바뀐데이터를 렌더링

4. Delete(TodoListItem.tsx)
   - 삭제버튼도 수정버튼과 마찬가지로 렌더링되는 리스트 우측에 렌더링
   - 삭제버튼을 클릭했을 때 url에 해당 아이템의 id를 params에 담아 `DELETE` API요청
     - 요청 성공 시 해당 데이터가 삭제되면 삭제된 데이터를 제외한 나머지 데이터를 `GET`요청으로 받아와 렌더링 실시
