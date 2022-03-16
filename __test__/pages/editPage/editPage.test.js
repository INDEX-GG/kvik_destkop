import '@testing-library/jest-dom'
import EditPage from "../../../pages/editPage/[id]";
import {render} from "@testing-library/react";


jest.mock('next/router', () => ({
    useRouter: () => ({
        query: {
        id: '948'
        },
    }),
    // useProduct: () => ({
    //     productOld: {
    //         price: '35000',
    //         title: 'фывап',
    //         photo: ["http://192.168.145.195:6001/images/po/fd/53/94/83/24853d141f5823763e870efc226d420211115153152863471.webp",
    //             "http://192.168.145.195:6001/images/po/3c/a5/e7/14/d5881a78a4a778037349ff7279a9920211115153314591465.webp"] ,
    //         description: 'пав ыры чвыао лгзшхх',
    //         address: 'г Москва, ул Челябинская, д 2',
    //     },
    // }),
    useAuth: () => ({
        id: {
            id: '85',
            isAuth: true
        }
    }),
}));


// const match={params: {username: 'akshay'}, isExact: true, path: "", url: ""}
// const fetchUserFn = jest.fn(match);
// const wrapper = shallow(<UserDetailsScreen match={match} fetchUsers={fetchUserFn} />, {
//     disableLifecycleMethods: true
// });

test('над категориями есть название "Редактирование объявления"', async ()=> {

    // let getByTestId
    // beforeEach(() => {
    //     const component = render(<EditPage />)
    //     getByTestId = component.getByTestId
    // })
    render(<EditPage />);
    const mainHeading = await screen.getByTestId("main-heading")

    expect(mainHeading.textContent).toBe("Редактирование объявления")
})


