const API_SERVER = import.meta.env.VITE_API_SERVER;

function useMutation(url: string, options: RequestInit = {}) {
  const send = async <T>(addOptions = {}): Promise<T> => {
    if (!url.startsWith("http")) {
      url = API_SERVER + url;
    }

    options = {
      // headers: {
      //   "Content-Type": "application/json",
      // },
      ...options,
      ...addOptions,
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error("에러가 발생했습니다!");
      }

      const result = await response.json();
      return result;
    } catch (err) {
      if (err instanceof TypeError) {
        console.error("네트워크 에러");
      } else if (err instanceof Error) {
        console.error(err.message);
      }
      throw err;
    }
  };

  return { send };
}

export default useMutation;
