import Comments from "./Comments";
import Subscribes from "./Subscribes";
import StarRating from "./StarRating";

/* Модальное окно "отзывы и рейтинг" */
export function ModalRating({rate = 0, comments = 0, modal, mobile}) {
  return (
    <div className="modal__wrapper_md accountContainer">
      <div className="modal__block__top accountTop">
        <>
          {mobile ? <div className="accountArrowLeft" onClick={() => modal()}></div> : null}
          <h6 className="modal__block__top_title accountTitle">Рейтинг и отзывы</h6>
        </>
        <div className="accountRatingBox">
          <div className="accountRaitingNumber">{rate}.0</div>
          <StarRating rating={rate} />
        </div>
      </div>
      {comments == 0 ? (
        <div className="modal__block__middle">
          <h6 className="modal__block__middle__title">У Вас еще нет отзывов</h6>
          <p className="modal__block__middle_rating_description">
            Здесь будут отображаться отзывы,
            <br />и на их основе составляться ваш рейтинг
          </p>
        </div>
      ) : (
        <div className="comment__block">
          <Comments />
          <Comments />
          <Comments />
        </div>
      )}
    </div>
  );
}

/* Модальное окно "Подписчики" */
export function ModalSubscribers({data, subscribers = 0, modal, mobile}) {
  return (
    <div className="modal__wrapper_md acoountContainer">
      <div className="modal__block__top accountTop">
        <>
          {mobile ? <div className="accountArrowLeft" onClick={() => modal()}></div> : null}
          <h6 className="modal__block__top_title accountTitle">00 подписчиков</h6>
        </>
      </div>
      {subscribers == 0 ? (
        <div className="modal__block__middle_wrepper">
          <div className="modal__block__middle">
            <h6 className="modal__block__middle__title">У Вас еще нет подписчиков</h6>
            <p className="modal__block__middle_rating_description">Здесь будет отображаться список подписанных на вас пользователей</p>
          </div>
        </div>
      ) : (
        <div className="comment__block">
          <Subscribes data={data} />
          <Subscribes data={data} />
          <Subscribes data={data} />
          <Subscribes data={data} />
        </div>
      )}
    </div>
  );
}

/* Модальное окно "Подписка" */
export function ModalSubscription({data, subscription = 0, modal, mobile}) {
  return (
    <div className="modal__wrapper_md acoountContainer">
      <div className="modal__block__top accountTop">
        <>
          {mobile ? <div className="accountArrowLeft" onClick={() => modal()}></div> : null}
          <h6 className="modal__block__top_title accountTitle">00 подписок</h6>
        </>
      </div>
      {subscription == 0 ? (
        <div className="modal__block__middle">
          <h6 className="modal__block__middle__title">У Вас еще нет подписок</h6>
          <p className="modal__block__middle_rating_description">Здесь будет отображаться список пользователей на которых вы подпишетесь</p>
        </div>
      ) : (
        <div className="comment__block">
          <Subscribes data={data} />
          <Subscribes data={data} />
          <Subscribes data={data} />
        </div>
      )}
    </div>
  );
}
/* Модальное окно "Диалог" */ 
export function ModalMessage({modal}) {
  return (
    <div className="modal__wrapper_md acoountContainer">
      <div className="modal__block__top accountTop">
        <>
          <div className="accountArrowLeft" onClick={() => modal()}></div>
          <h6 className="modal__block__top_title accountTitle">Диалоги</h6>
        </>
      </div>
      {1 == 0 ? (
        <div className="modal__block__middle">
          <h6 className="modal__block__middle__title">У Вас еще нет сообщений</h6>
          <p className="modal__block__middle_rating_description">Здесь будет отображаться все ваши диалоги</p>
        </div>
      ) : (
        <div className="messageMobile">
              <div className="messageHeader small">
                <img src="https://source.unsplash.com/random" />
                <div>
                  <div>
                    <div>
                      <div>Имя пользователя</div>
                      <div className="light">00.00.00 00:00</div>
                    </div>
                    <img src="https://source.unsplash.com/random?portrait" />
                  </div>
                  <div>0000</div>
                  <div>Название товара</div>
                </div>
              </div>
              <div className="messageChats">
                <div className="messageChat">
                  <div className="chatDate small light">00.00.00</div>
                  <div className="chatLocutor">
                    <img src="https://source.unsplash.com/random?portrait" />
                    <div>ТекстТекстТекстТекстТексТекстТекст</div>
                    <div>00:00</div>
                  </div>
                  <div className="chatUser">
                    <div>ТекстТе кстТек стТекс тТе ксТекстТекст ТекстТе кстТек стТекс тТе ксТекстТекст ТекстТе кстТек стТекс тТе ксТекстТекст ТекстТе кстТек стТекс тТе ксТекстТекст</div>
                    <div>00:00</div>
                  </div>
                </div>
                <div className="messageChat">
                  <div className="chatDate small light">00.00.00</div>
                  <div className="chatLocutor">
                    <img src="https://source.unsplash.com/random?portrait" />
                    <div>ТекстТекстТекстТекстТексТекстТекст</div>
                    <div>00:00</div>
                  </div>
                  <div className="chatUser">
                    <div>ТекстТекстТекстТекстТексТекстТекст</div>
                    <div>00:00</div>
                  </div>
                </div>
                <div className="messageChat">
                  <div className="chatDate small light">Вчера</div>
                  <div className="chatLocutor">
                    <img src="https://source.unsplash.com/random?portrait" />
                    <div>ТекстТекстТекстТекстТексТекстТекст ТекстТекстТекстТекстТексТекстТекст ТекстТекстТекстТекстТексТекстТекст</div>
                    <div>00:00</div>
                  </div>
                  <div className="chatUser">
                    <div>ТекстТекстТекстТекстТексТекстТекст</div>
                    <div>00:00</div>
                  </div>
                </div>
                <div className="messageChat">
                  <div className="chatDate small light">Сегодня</div>
                  <div className="chatLocutor">
                    <img src="https://source.unsplash.com/random?portrait" />
                    <div>ТекстТекстТекстТекстТексТекстТекст</div>
                    <div>00:00</div>
                  </div>
                  <div className="chatUser">
                    <div>ТекстТекстТекстТекстТексТекстТекст</div>
                    <div>00:00</div>
                  </div>
                </div>
              </div>
              <div className="messageChatInput">
                <button className="messageFile"></button>
                <input className="messageInput" type="text" placeholder="Написать сообщение" />
                <button className="messageSend"></button>
              </div>
            </div>
      )}
    </div>
  )
}

/* Модальное окно "Выход" */
export function modalLogout() {
  return (
    <div className="modal__wrapper">
      <h6 className="modal__block_title accountLogout">Вы уверены что хотите выйти?</h6>
      <div className="modal__block_btn ">
        <a className="btn-blue accountLogoutButtonYes" href="">
          ОТМЕНА
        </a>
        <a className="btn-red accountLogoutButtonNo" href="">
          ВЫЙТИ
        </a>
      </div>
    </div>
  );
}

/* Модальное окно "Удалить аккаунт" */
export function modalDeleteAccount() {
  return (
    <div className="modal__wrapper">
      <h6 className="modal__block_title">
        Вы уверены удалить аккаунт? <br />
        Аккаунт будет удален навсегда
      </h6>

      <div className="modal__block_btn ">
        <a className="btn-blue" href="">
          ОТМЕНА
        </a>
        <a className="btn-red" href="">
          УДАЛИТЬ
        </a>
      </div>
    </div>
  );
}

/* Модальное окно "Удалить историю" */
export function modalDeletHistory() {
  return (
    <div className="modal__wrapper">
      <h6 className="modal__block_title">Вы уверены что хотите выйти?</h6>

      <div className="modal__block_btn ">
        <a className="btn-blue" href="">
          ОТМЕНА
        </a>
        <a className="btn-red" href="">
          ОЧИСТИТЬ
        </a>
      </div>
    </div>
  );
}

/* Модальное окно админа"Отклонение" */
export function BtnReject({ Close }) {
  return (
    <div className="modal__wrapper_reject">
      <div className="modal__header">Причина отклонения</div>
      <div className="modal__middle">
        <div className="modal__middle__description_rejected">Выберете причину отклоления объявления</div>

        <label className="checkbox">
          <input type="checkbox" />
          <div className="checkbox__text">Указана контактная информация в названии, тексте или на изображении</div>
        </label>
        <label className="checkbox">
          <input type="checkbox" />
          <div className="checkbox__text">В одном объявлении предложено несколько товаров или услуг</div>
        </label>
        <label className="checkbox">
          <input type="checkbox" />
          <div className="checkbox__text">Размещение запрещённых товаров или услуг на территории РФ</div>
        </label>
        <label className="checkbox">
          <input type="checkbox" />
          <div className="checkbox__text">Дискриминация других пользователей по каким - либо признакам</div>
        </label>
        <label className="checkbox">
          <input type="checkbox" />
          <div className="checkbox__text">Объявление размещено в неверной категории</div>
        </label>
        <label className="checkbox">
          <input type="checkbox" />
          <div className="checkbox__text">Указана не соответствующая цена</div>
        </label>
        <label className="checkbox">
          <input type="checkbox" />
          <div className="checkbox__text">Несоответствие фото, описания, заголовка</div>
        </label>
        <label className="checkbox">
          <input type="checkbox" />
          <div className="checkbox__text">Некорректное описание</div>
        </label>
        <label className="checkbox">
          <input type="checkbox" />
          <div className="checkbox__text">Некорректное название объявления</div>
        </label>
        <label className="checkbox">
          <input type="checkbox" />
          <div className="checkbox__text">Недопустимая информация в названии, тексте, на изображении</div>
        </label>
        <label className="checkbox">
          <input type="checkbox" />
          <div className="checkbox__text">Указаны неверные параметры</div>
        </label>
      </div>
      <div className="modal__footer">
        <button className="btn_submit">Отправить</button>
      </div>
    </div>
  );
}
