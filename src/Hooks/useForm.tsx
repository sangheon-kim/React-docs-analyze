import React from "react";

/**
 *
 * @description onChange 이벤트를 받아서 처리해줄 onChange 함수를 리턴해주고 해당 name에 맞게 스테이트를 변경해주고,
 *              초기값으로 지정한 양식에 맞게 state를 리턴해주는 Hook 입니다.
 * @export
 * @param {*} initialValue
 * @param {string} [key]
 * @returns
 */
export function useForm(initialValue: any, key?: string) {
  // 만약 object 형식으로 들어오지 않는 경우에는
  // 두번째 매개변수를 통해 바인딩된 값을 프로퍼티 키값으로 두고
  // initialValue의 바인딩된 값을 그 프로퍼티의 값으로 만든 객체로 initialValue를 변경해줍니다.
  if (!!key) initialValue = { [key]: initialValue };
  // 위에서 들어온 초기값을 기반으로 state Hook을 사용하여 초기화 해줍니다.
  const [form, setForm] = React.useState(initialValue);

  // 현재 세 컴포넌트 모두 Effect Hook에서 form을 찍어놓아서 가지고 왔습니다.
  React.useEffect(() => {
    console.log(form);
  }, [form]);

  // before2.tsx에서 사용한 전화번호 유효성 검증을 통해서 자동으로 양식에 맞게 변경해주는 함수
  const telValidation = (telNumber: string) => {
    const reg = /([0-1]{3})-([0-9]{3,4})-([0-9]{4})/gm;
    const faultReg = /([0-1]{3})([0-9]{4})([0-9]{4})/gm;

    if (reg.test(telNumber)) {
      return telNumber;
    } else {
      const result = telNumber.replace(faultReg, `$1-$2-$3`);

      return result;
    }
  };

  // 공통으로 사용할 onChange함수 정의
  const onChange = (e: any) => {
    let { name, value } = e.target;

    // target의 name이 telNumber인 경우 validation체크 후 양식에 맞게 변경해준 후 value에 오버라이딩 해줍니다.
    value = name === "telNumber" ? telValidation(value) : value;
    // 현재 change이벤트가 발생하고 있는 Element의 name을 e.target 오브젝트의 name을 통해서 확인 후 해당 state 변경
    // value로는 해당 change이벤트가 발생하는 엘리먼트의 value값으로 변경해줍니다.
    setForm({
      ...form,
      [name]: value,
    });
  };

  // onChange는 공통으로 리턴해줄 것이기에 넣어놓습니다.
  const obj: any = {
    onChange,
  };

  // 키가 없다면 form이라는 프로퍼티를 이용하여 obj에 state Hook을 이용한 커스텀 Hook에 state인 form을 넣어줍니다.
  if (!key) obj["form"] = form;
  // 키가 있을 경우에는, 굳이 사용자가 value값만 추출하면 되니... form state에서 key를 이용하여 값만 추출하여 값을 리턴 해줍니다.
  // 키값으로는 사용자가 정의한 키값 그대로 내보내주면 좋겠죠?
  else obj[key] = form[key];

  return obj;
}
