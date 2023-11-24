import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { app } from "firebaseApp";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { signup } from "api/api";

export default function SignupForm() {
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    setFormData({ ...formData, [name]: value });

    if (name === "email") {
      setEmail(value);
      console.log(value);
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
      } else if (passwordConfirm?.length > 0 && value !== passwordConfirm) {
        setError("비밀번호와 비밀번호 확인 값이 다릅니다.");
      } else {
        setError("");
      }
    }

    if (name === "password_confirm") {
      setPasswordConfirm(passwordConfirm);

      console.log(value, password);

      if (value?.length < 8) {
        setError("비밀번호는 8자리 이상으로 입력해주세요.");
      } else if (value !== password) {
        setError("비밀번호가 일치하지 않습니다.");
      } else {
        setError("");
      }
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup(formData);

    try {
      // const auth = getAuth(app);
      // await createUserWithEmailAndPassword(auth, email, password);
      // if (loggedInUser === 200) {
      // 로그인 성공
      toast("회원가입에 성공하였습니다.");
      navigate("/login");
      // }
    } catch (error: any) {
      toast.error(error?.code);
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmit} className="form form-login">
      <h1 className="form__title">회원가입</h1>
      <div className="form__block">
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          onChange={onChange}
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
        />
      </div>
      <div className="form__block">
        <label htmlFor="password_confirm">비밀번호 확인</label>
        <input
          type="password"
          name="password_confirm"
          id="password_confirm"
          required
          onChange={onChange}
        />
      </div>
      {error && error?.length > 0 && (
        <div className="form__block">
          <div className="form__erorr">{error}</div>
        </div>
      )}
      <div className="form__block">
        계정이 이미 있으신가요?
        <Link to="/login" className="form__link">
          로그인하기
        </Link>
      </div>
      <div className="form__block">
        <input
          type="submit"
          value="회원가입"
          className="form__btn-submit"
          disabled={error?.length > 0}
        />
      </div>
    </form>
  );
}
