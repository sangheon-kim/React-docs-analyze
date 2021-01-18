// import React from "react";

// const DummyForm: React.FC = () => {
//   const [searchValue, setSearchValue] = React.useState("");
//   const [placeList, setPlaceList] = React.useState([]);
//   const api = async () => {
//     const response = await fetch({
//       url: "https://localhost:3000",
//       method: "post",
//       body: {
//         value: placeList,
//       },
//     });

//     const {
//       data: {
//         contents: { placeList },
//       },
//     } = response.json();
//     setPlaceList(placeList);
//   };

//   React.useEffect(() => {
//     api();
//   }, [searchValue]);

//   return (
//     <div className="DummyForm">
//       <form>
//         <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
//       </form>
//     </div>
//   );
// };

// export default DummyForm;

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Notify = () => {
  const onclick = () =>
    toast("스팟이 등록되었어요!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

  return <ToastContainer />;
};

export default Notify;
