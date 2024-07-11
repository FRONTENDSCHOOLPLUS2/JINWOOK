const API_SERVER = import.meta.env.VITE_API_SERVER;

function useMutation(url, options = {}) {
  const send = async (addOptions = {}) => {
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
      console.error(err);
      throw err;
    }
  };

  return { send };
}

export default useMutation;
