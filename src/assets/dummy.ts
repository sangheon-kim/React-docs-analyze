import * as React from "react"

// 버튼 리스트 관련 인터페이스 타입
export interface IBtnAttr {
  text: string;
  key: string;
}

// 메뉴 배열 관련 인터페이스 타입
export interface IMenuAttr {
  text: string;
  key: string;
  href: string;
}

// 버튼 생성 관련 배열
export const btnArray: IBtnAttr[] = [
  {
    text: '1번 버튼',
    key: 'button1'
  },
  {
    text: '2번 버튼',
    key: 'button2'
  },
  {
    text: '3번 버튼',
    key: 'button3'
  },
  {
    text: '4번 버튼',
    key: 'button4'
  }
];

// 메뉴 생성관련 배열
export const linkArray: IMenuAttr[] = [
  {
    text: '홈',
    key: 'home',
    href: '/'
  },
  {
    text: '소개',
    key: 'introduce',
    href: '/introduce'
  },
  {
    text: '포트폴리오',
    key: 'portfolio',
    href: '/port'
  },
  {
    text: '문의',
    key: 'inquire',
    href: '/inquire'
  }
]


// 버튼 생성 함수
export function createButton(item: IBtnAttr, index: number | undefined, ref?: React.RefObject<HTMLElement>):React.ReactElement {
  const $button = React.createElement("button", {
    className:`button-sh ${item.key}`,
    type: 'button',
    key: `${item.key}_${index}`,
    id: item.key,
  }, item.text);

  return $button;
}

// a태그 생성함수
export function createLink(item: IMenuAttr, index: number | undefined, ref?:React.RefObject<HTMLElement>):React.ReactElement {
  const $atag = React.createElement("a", {
    className: `link-sh ${item.key}`,
    type: 'button',
    key: `${item.key}_${index}`,
    href: item.href,
    id: item.key,
  }, item.text)

  return $atag;
}