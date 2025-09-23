import { ENDPOINT } from "../constants/Endpoints";

export const registerService = async ({ email, password, firstName, lastName }) => {
  try {
    const response = await fetch(`${ENDPOINT}auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, firstName, lastName }),
    });

    // console.warn("Libraries L13", response);

    if (!response.ok && response.status === 401) {
      throw new Error("Revisar datos ingresados");
    } else if (!response.ok && response.status === 409) {
      throw new Error("Ya existe un usuario con ese correo electrónico");
    } else if (!response.ok && response.status !== 401) {
      throw new Error("Error interno, contacte al administrador");
    }

    return await response.json();
  } catch (error) {
    return { error: true, msg: error.message };
  }
};

export const loginService = async ({ email, password }) => {
  // console.warn("loginService L23", email, password);
  try {
    // const response = await fetch(`localhost:3000/api/auth/login`, {
    const response = await fetch(`${ENDPOINT}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // console.warn("LoginSrevice L34", response);

    if (!response.ok && response.status === 401) {
      throw new Error("Correo y/o contraseña incorrectos");
    } else if (!response.ok && response.status !== 401) {
      throw new Error("Error interno, contacte al administrador");
    }

    return await response.json();
  } catch (error) {
    return { error: true, msg: error.message };
  }
};

export const getProfileService = async ({ acces_token }) => {
  try {
    const response = await fetch(`${ENDPOINT}auth/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${acces_token}`,
      },
      // body: JSON.stringify({ email, password }),
    });

    // console.warn("loginService L32", response.json());

    if (!response.ok) {
      throw new Error("Failed to get profile");
    }

    return await response.json();
  } catch (error) {
    return { error: true, msg: error.message };
  }
};

export const getBooksService = async (page) => {
  // const BOOKS = "http://localhost:3000/api/books";
  const BOOKS = `${ENDPOINT}books?page=${page}&limit=10`;
  const rawData = await fetch(BOOKS);
  const items = await rawData.json();

  return items.map((book) => {
    const { _id, title, author, publisher, coverImage, genres } = book;

    return {
      _id,
      title,
      author,
      publisher,
      coverImage,
      genres,
    };
  });
};

export const getBookByIdService = async ({ id }) => {
  const BOOK = `${ENDPOINT}books/${id}`;
  const data = await fetch(BOOK);
  const book = await data.json();

  return book;
};

export const addReviewService = async ({ bookId, title, comment, rating, token }) => {
  const response = await fetch(`${ENDPOINT}reviews`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ bookId, rating, comment, title }),
  });

  // console.log("libraries L111", response);

  if (!response.ok) {
    throw new Error("Failed to add review");
  }

  return await response.json();
};

export const getReviewByBookIdService = async ({ book_id }) => {
  const response = await fetch(`${ENDPOINT}reviews/book/${book_id}?page=1&limit=10`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // console.log(response);

  if (!response.ok) {
    throw new Error("Failed to add review");
  }

  return await response.json();
};

export const getMoreReviewByBookIdService = async ({ book_id, page }) => {
  const response = await fetch(`${ENDPOINT}reviews/book/${book_id}?page=${page}&limit=10`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // console.log(response);

  if (!response.ok) {
    throw new Error("Failed to add review");
  }

  return await response.json();
};
