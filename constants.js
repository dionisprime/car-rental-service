const PORT = process.env.PORT || 3000;
const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL;
const DEFAULT_ROLES = ['user'];
const ROLE = {
  ADMIN: 'admin',
  USER: 'user',
};

const ERROR_MESSAGE = {
  NOT_AUTHORIZED: 'Пользователь не авторизован, доступ запрещен',
  NOT_ADMIN: 'Доступ только для админа!',

  INCORRECT_LENGTH: 'Некорректная длина, меньше 3х или более 30 символов...',
  INCORRECT_VALUE: 'Некорректное значение',

  MUST_BE_AN_ARRAY: 'должен быть массивом',

  USER_NOT_FOUND: 'Пользователь не найден',
  USER_NOT_VERIFIED: 'Пользователь не верифицирован',
  USERS_NOT_FOUND: 'Пользователи не найдены',
  GET_USER_ERROR: 'Ошибка при получении пользователя',
  GET_USERS_ERROR: 'Ошибка при получении пользователей',
  ADD_USER_ERROR: 'Не удалось добавить пользователя',
  EDIT_USER_ERROR: 'Не удалось обновить пользователя',
  DELETE_USER_ERROR: 'Не удалось удалить пользователя',

  CARS_NOT_FOUND: 'Автомобили не найдены',
  CAR_NOT_FOUND: 'Автомобиль не найден',
  GET_CAR_ERROR: 'Ошибка при получении автомобиля',
  GET_CARS_ERROR: 'Ошибка при получении автомобилей',
  ADD_CAR_ERROR: 'Не удалось добавить автомобиль',
  EDIT_CAR_ERROR: 'Не удалось обновить автомобиль',
  DELETE_CAR_ERROR: 'Не удалось удалить авто',
  CAR_ALREADY_RENTED: 'Машина уже арендована!',
  CAR_OCCUPIED: 'Машина уже арендована на указанные даты!',

  RENTS_NOT_FOUND: 'Записи об аренде не найдены',
  RENT_NOT_FOUND: 'Запись об аренде не найдена',
  GET_RENT_ERROR: 'Ошибка при получении записи об аренде',
  GET_RENTS_ERROR: 'Ошибка при получении записей об аренде',
  ADD_RENT_ERROR: 'Не удалось добавить запись об аренде',

  EDIT_CAR_ERROR: 'Не удалось обновить запись об аренде',
  DELETE_RENT_ERROR: 'Не удалось удалить запись об аренде',
  DELETE_RENT_OK: 'Рента успешно отменена',

  ACCESS_GRANTED: 'Доступ разрешен',
  ACCESS_DENIED: 'Другой пользователь. Доступ запрещен',
  ID_NOT_MATCH: 'ID не совпадает',

  REQUIRED_FIELD: 'Обязательное поле!',

  DATE_CONFLICT: 'Дата начала не может быть позже даты окончания',
};

module.exports = {
  PORT,
  DB_CONNECTION_URL,
  ERROR_MESSAGE,
  DEFAULT_ROLES,
  ROLE,
};
