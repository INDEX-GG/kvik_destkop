import { useState } from 'react';
import MetaLayout from '../../layout/MetaLayout';
import Modal from '../../components/Modal';
import { modalLogout } from '../../components/Modals';
import { Ads } from "../../components/admin/ads/Ads";
import { Setting } from '../../components/admin/Setting/Setting';
import { initials, stringToColor } from '../../lib/services';

const userInfo = {
  userId: 1,
  userPic: '',
  userName: 'Александр Иванов',
};

const menuItems = [
  { id: 1, name: 'menuadmin menuOffers', title: 'Объявления' },
  { id: 2, name: 'menuadmin menuNotifications', title: 'Сообщения' },
  { id: 3, name: 'menuadmin menuDeals', title: 'Сделки' },
  { id: 4, name: 'menuadmin menuSettings', title: 'Настройки' },
];

function Admin() {
  const [menuItem, setMenuItem] = useState({ i: 1, itm: 'menuOffers', ttl: 'Объявления' });

  const [modal, setModal] = useState({});
  function modalOlen(e, size, content, title) {
    function smf() {
      setModal({ title: title, content: content, size: size, isOpen: false });
    }
    e.preventDefault();
    setModal({ title: title, content: content, size: size, isOpen: true });
    setTimeout(smf, 500);
  }

  function photoUpload() {
    return (
      <div className="userPagePhotoUpload">
        <div>
          <div className="upPUPhoto">

            <div>Добавить фото</div>
          </div>
          <div className="thin small superLight">
            JPG или PNG. Размер фото - до 25MB
          </div>
        </div>
        <button className="button contained bhigh">Загрузить фото</button>
      </div>
    )
  }

  return (
    <MetaLayout title={'Панель администратора'} >
      <div className="admin">
        <div className="clientPage text">
          <div className="clientPage__menu" >
            <div className="clientPage__userinfo">
              <div key={userInfo} className="clientPage__userpic">
                {userInfo.userPic && <img src={userInfo.userPic} /> || <div className="clientPage__userinitials" style={{ backgroundColor: `${stringToColor(userInfo.userName)}` }}>{initials(userInfo.userName)}</div>}
                <button onClick={e => { modalOlen(e, 'md', photoUpload()) }} className="addPhoto"></button>
              </div>
              <div className="clientPage__username">
                {userInfo.userName}
              </div>
              <div className="userMenuContainer admin_menu">
                {menuItems.map(item => {
                  return (
                    <a key={item.id} onClick={() => setMenuItem({ i: item.id, itm: item.name, ttl: item.title })} className={item.name + ((item.title === menuItem.ttl) ? (` ${item.name}Active highlight smooth`) : (' smooth'))}>{item.title}</a>
                  )
                })}
                <a onClick={e => { modalOlen(e, 'sm', modalLogout()) }} className="offerUnpublish thin superLight" className="menuLogoff smooth">Выход</a>
              </div>
            </div>
          </div>
          <div className="clientPage__container">
            {
              (((menuItem.i === 1) && <Ads />) ||
                ((menuItem.i === 2)) ||
                ((menuItem.i === 3)) ||
                ((menuItem.i === 4)) && <Setting  {...userInfo} />)
            }
          </div>
        </div>
        <Modal {...modal} />
      </div>
    </MetaLayout>
  )
}

export default Admin