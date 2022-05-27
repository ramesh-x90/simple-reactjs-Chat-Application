import * as currentUserUseCases from "./CurrentUserInfoUseCases";
import * as chatusecases from "./ChatMsgUseCases";

const getLocalUserUseCase = {
  getLocalUserData: currentUserUseCases.getLocalUserData,
};

export const UseCases = {
  UserUseCase: getLocalUserUseCase,
  ChatMsgUseCases: chatusecases,
};
