import React, { useState } from "react";
import { Link } from "react-router-dom";
import { app } from "firebaseApp";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("로그인에 성공하였습니다.");
    } catch (error: any) {
      toast.error(error?.code);
      console.log(error);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "email") {
      setEmail(value);

      const emailRegex = /^[a-zA-Z0-9-_]+@[a-zA-Z.]+$/;

      if (!value?.match(emailRegex)) {
        setError(
          "이메일 형식이 올바르지 않습니다. 영문 대소문자, 숫자와 특수기호(_),(-),(@)만 사용 가능합니다."
        );
      } else {
        setError("");
      }
    }

    if (name === "password") {
      setPassword(value);

      if (value?.length < 8) {
        setError("비밀번호는 8자리 이상으로 입력해주세요.");
      } else {
        setError("");
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className="form form-login">
      <h1 className="form__title">로그인</h1>
      <div className="form__block">
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          onChange={onChange}
          value={email}
        />
      </div>
      <div className="form__block">
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          onChange={onChange}
          value={password}
        />
      </div>
      {error && error?.length > 0 && (
        <div className="form__block">
          <div className="form__error">{error}</div>
        </div>
      )}
      <div className="form__block">
        계정이 없으신가요?
        <Link to="/signup" className="form__link">
          회원가입하기
        </Link>
      </div>
      <div className="form__block">
        <input type="submit" value="제출" className="form__btn-submit" />
      </div>
    </form>
  );
}
