import { NextSeo } from "next-seo";
import { createSEOProps } from "#lib/seo";
import { useMedia } from "../hooks/useMedia";
import ActiveIcon from '../UI/icons/ActiveIcon';

const seoProps = createSEOProps({
	title: "Информация о компании",
	link: "/about"
})

function About() {
	const { matchesMobile } = useMedia()

	return (<>
		<NextSeo {...seoProps} />
		<div className="about">
			<div className="bodyAbout">
				<h2 className="aboutTitle">Продавай и покупай легко с KVIK</h2>
				<div className="text1">Огромный ассортимент товаров и услуг</div>
				<br />
				<div className="text2">
					Товары для дома и дачи, вакансии и резюме, недвижимость и автомобили,
					одежда и обувь, электроника и бытовая техника, домашние питомцы и
					растения, подарки и hand-made – здесь вы найдёте объявления на любой
					вкус!
				</div>
				<br />
				<div className="text1">Интуитивный интерфейс</div>
				<br />
				<div className="text2">
					Продуманная структура сайта и поиск объявлений помогут быстро найти
					нужные предложения. А разместить объявление о продаже товаров и услуг
					можно всего в несколько кликов.{" "}
				</div>
				<br />
				<div className="text1">Широкая аудитория </div>
				<br />
				<div className="text2">
					Тысячи продавцов и покупателей посещают сайт onekvik.ru ежедневно.
				</div>
				<br />
				<div className="text1">Бесплатно</div>
				<br />
				<div className="text2">Публикуйте объявления бесплатно:</div>
				<br />
				<div className="text2">
					{" "}
					{matchesMobile ? null : <ActiveIcon />} <span>до 600 объявлений для малого и среднего бизнеса.</span>{" "}
				</div>
				<br />
				<div className="text2" alt=''>  {matchesMobile ? null : <ActiveIcon />} <span>до 200 объявлений для частных лиц</span></div>
				<br />
				<div className="text1">
					{" "}
					Дополнительные возможности продвижения товаров и услуг
				</div>
				<br />
				<div className="text2">
					{" "}
					За небольшую оплату возможно выделить объявление цветом, поднять в
					поиске или воспользоваться другими инструментами продвижения.
				</div>
				<br />
				<div className="text2">
					{" "}
					<span className="webInfo">Сайт onekvik.ru</span> – это удобный и эффективный инструмент для бизнеса.
					Подавайте объявления и находите новых клиентов бесплатно!
				</div>
				<br />
				<div className="text1">
					{" "}
					Размещайте бесплатные объявления на onekvik.ru, экономьте время и
					средства!{" "}
				</div>
				<br />
				<div className="text1">
					{" "}
					Реквизиты Администрации:
				</div>
				<br/>
				<div className="text2">
					{" "}
					ООО «Гуру Групп»
				</div>
				<br/>
				<div className="text2">
					{" "}
					Адрес: 454136, г. Челябинск, ул. Молодогвардейцев, д.60 стр.В, пом 505, этаж 5

				</div>
				<br/>
				<div className="text2">
					{" "}
					ОГРН 1207400017505
				</div>
				<br/>
				<div className="text2">
					{" "}
					ИНН 7447294868
				</div>
				<br/>
				<div className="text2">
					{" "}
					КПП 744701001
				</div>
				<br/>
				<div className="text2">
					{" "}
					Телефон: +79191232395
				</div>
				<br/>
				<div className="text2">
					{" "}
					E-mail: support@onekvik.ru
				</div>
			</div>
		</div>
	</>

	);
}

export default About;
