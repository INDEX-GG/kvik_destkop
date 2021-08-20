import { useState, useEffect } from 'react'

const Modal = ({ title, content, size, isOpen }) => {
	const [opened, setOpened] = useState('');


	useEffect(() => {
		if (isOpen) {
			setOpened(' openModal');
		}
	}, [isOpen])


	function handleClose(e) {
		e.preventDefault();
		setOpened('');
	}

	useEffect(() => {
		let blackout = document.querySelector(".blackout");
		window.onclick = function (e) {
			if (e.target === blackout) {
				setOpened('');
			}
		};
	})


	return (
		<div className={`blackout${opened}`}>
			<div className={`modalWindow${opened} modal${size}`}>
				<div className={(!title) ? ('mtD') : ('modalTitle')}>
					{title}
				</div>
				<div className="modalContent">
					{content}
				</div>
				<button onClick={handleClose} className="modalClose">
				</button>
			</div>
		</div>
	)
}

export default Modal;

// Код
// const [modal, setModal] = useState({});
// function modalOlen(e, size, content, title) {
//   function smf() {
//     setModal({ title: title, content: content, size: size, isOpen: false });
//     console.log(modal)
//   }
//   e.preventDefault();
//   setModal({ title: title, content: content, size: size, isOpen: true });
//   console.log(modal);
//   setTimeout(smf, 500);
// }

// Рендер
{/* <Modal {...modal} /> */ }

// Событие
// onClick={e => { modalOlen(e, 'sm/md/lg/xl', 'content', 'title если нужен') }}