import Button from "@components/Button";
import Submit from "@components/Submit";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ErrorType } from "types/community";

interface FormValue {
  name: string;
  email: string;
  password: string;
  type: "user" | "seller";
  profileImage:
    | FileList
    | {
        path: string;
      };
}

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValue>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValue> = async (formData) => {
    try {
      // 파일 업로드
      if (formData.profileImage instanceof FileList) {
        if (formData.profileImage.length > 0) {
          const imageFormData = new FormData();
          imageFormData.append("attach", formData.profileImage[0]);

          const fileRes = await fetch(
            `${import.meta.env.VITE_API_SERVER}/files`,
            {
              method: "POST",
              headers: {},
              body: imageFormData,
            }
          );

          const result = await fileRes.json();

          formData.profileImage = { path: result.item[0].path };
        } else {
          formData.profileImage = { path: "/files/00-sample/XPTwYP2nb.png" };
        }
      }

      formData.type = "user";

      console.log(formData);

      const response = await fetch(`${import.meta.env.VITE_API_SERVER}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(result);

      if (result.ok === 1) {
        alert("회원가입이 완료되었습니다!");
        navigate("/user/login");
      } else {
        if (result.errors) {
          result.errors.forEach((error: ErrorType) =>
            setError(error.path, { message: error.msg })
          );
        } else {
          alert(result.message);
        }
      }
    } catch (err) {
      if (err instanceof TypeError) {
        console.error("네트워크 에러!");
      }
    }
  };

  return (
    <main className="min-w-80 p-5 flex-grow flex items-center justify-center">
      <div className="p-8 border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0">
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
            회원 가입
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="name"
            >
              이름
            </label>
            <input
              type="text"
              id="name"
              placeholder="이름을 입력하세요."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              {...register("name", {
                required: "이름을 입력하세요.",
                minLength: {
                  value: 2,
                  message: "이름을 2글자 이상 입력하세요.",
                },
              })}
            />
            {/* 입력값 검증 에러 출력 */}
            {errors.name && (
              <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="email"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              placeholder="이메일을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              {...register("email", {
                required: "이메일을 입력하세요.",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "올바른 이메일 형식이 아닙니다.",
                },
              })}
            />
            {/* 입력값 검증 에러 출력 */}
            {errors.email && (
              <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="password"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              placeholder="비밀번호를 8자 이상 입력해 주세요."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              {...register("password", {
                required: "비밀번호를 입력하세요.",
                minLength: {
                  value: 8,
                  message: "비밀번호를 8자 이상 입력하세요.",
                },
              })}
            />
            {/* 입력값 검증 에러 출력 */}
            {errors.password && (
              <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="profileImage"
            >
              프로필 이미지
            </label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              placeholder="이미지를 선택하세요"
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
              {...register("profileImage")}
            />
          </div>

          <div className="mt-10 flex justify-center items-center">
            <Submit>회원가입</Submit>
            <Button type="reset" bgColor="gray" onClick={() => history.back()}>
              취소
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Signup;
