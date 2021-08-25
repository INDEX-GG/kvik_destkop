import React, {useState} from "react";
// import Develop from '../../../../../components/inDev/Develop';
import { Dialog } from "@material-ui/core";
import { ModalMessage } from "../../../Modals";
import { useMedia } from "../../../../hooks/useMedia"

function Messages(data) {
  function ellipsis(string, count) {
    if (string.length > count) {
      return `${string.substr(0, count - 1)}...`;
    } else {
      return string;
    }
  }

  const [messageModal, setMessageModal] = useState(false)

  const {matchesTablet, matchesMobile} = useMedia()

  function changeModal() {
    setMessageModal(!messageModal)
  }

  return (
    (
      <div className="clientPage__container_bottom">
        <div className="clientPage__container_content">
          <div className="notInfContainer">
            <div className="notInf__title">Здесь буду ваши диалоги</div>
            <p className="notInf__subtitle">
              Нажмите на иконку чата, чтобы договориться
              <br /> о покупке или продаже товаров и услуг
            </p>
          </div>
        </div>
      </div>
    ) || (
      <div className="clientPage__container_bottom">
        <div className="clientPage__container_nav__radio">
          <label className="checkbox">
            <input type="checkbox" />
            <div className="checkbox__text"></div>
          </label>
          <a>Удалить</a>
          <a>Заблокировать</a>
        </div>
        <div className="clientPage__container_content">
          <div className="messageContainer">
            <div className="messageDialogs">
              {data.data.map((item, i) => {
                return (
                  <a key={i} className="messageDialog" onClick={() => {matchesMobile || matchesTablet ? changeModal() : null}}>
                    <div className="messageOffer small">
                      <div className="messageDiaCheck">
                        <label className="checkbox">
                          <input type="checkbox" />
                          <div className="checkbox__text"></div>
                        </label>
                      </div>
                      <img src={`${item.offerImg}?${item.id}`} />
                      <div>{item.offerPrice.toLocaleString("ru-RU", { style: "currency", currency: "RUB" })}</div>
                      <div>{ellipsis(item.offerTitle, 12)}</div>
                    </div>
                    <div className="messageUser small">
                      <div className="messageUserBlock">
                        <img src={`${item.userPic}?${item.id}`} />
                        <div>
                          <div>{item.userName}</div>
                          <div className="light">{item.date}</div>
                        </div>
                      </div>
                      <div className="light">{item.message}</div>
                    </div>
                  </a>
                );
              })}
            </div>
            <div className="messageWindow">
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
          </div>
        </div>
        <Dialog open={messageModal} onClose={() => setMessageModal(!messageModal)} fullScreen={true}>
          <ModalMessage modal={changeModal}/>
        </Dialog>
      </div>
    )
  );
}

export default Messages;
