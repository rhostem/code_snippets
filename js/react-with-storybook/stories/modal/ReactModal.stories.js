import React from 'react'
import {
  withKnobs,
  text,
  boolean,
  number,
  color,
  select,
} from '@storybook/addon-knobs'
import ReactModal from 'react-modal'
import Alert from '../../modal/react-modal/Alert'
import {
  CommonModal,
  CloseButton,
  SubmitButtons,
  ModalScrollContents,
} from '../../modal/react-modal/CommonModal'
import { css } from 'styled-components'

export default {
  title: 'modal/ReactModal',
  decorators: [withKnobs],
}

export const DefaultStyle = () => (
  <ReactModal
    isOpen={boolean('isOpen', true)}
    style={{
      overlay: {
        // DEFAULTS
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
      },
      content: {
        // DEFAULTS
        position: 'absolute',
        top: '40px',
        left: '40px',
        right: '40px',
        bottom: '40px',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '20px',
      },
    }}>
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse nam quo
      doloribus rerum est natus reprehenderit accusamus sint ut ex in
      repudiandae optio, perspiciatis magni minus quae saepe, placeat unde!
    </div>
  </ReactModal>
)

export const StyleOverwrite = () => (
  <div>
    background texts
    <ReactModal
      isOpen={boolean('isOpen', true)}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9999,
        },
        content: {
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          border: 'none',
          background: '#efefef',
          overflow: 'auto',
          borderRadius: '0',
          outline: 'none',
          padding: '0',
        },
      }}>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
        quisquam obcaecati magnam rem ut, assumenda, commodi sunt, tenetur quis
        architecto quas. Magnam quidem earum temporibus atque iusto! Eveniet,
        fugit ipsam?
      </div>
    </ReactModal>
  </div>
)

export const AlertModal = () => {
  return (
    <Alert
      isOpen={boolean('isOpen', true)}
      onClose={() => {}}
      modalData={{
        html: null,
        contents: '알림입니다', // 본문. 제목(detail이 있을 때)
        detail: null, // 상세 텍스트
        isCancelVisible: false,
        cancelText: '취소',
        confirmText: '확인',
        onConfirm: () => {},
      }}></Alert>
  )
}

export const Common = () => {
  return (
    <CommonModal
      isOpen={boolean('isOpen', true)}
      onClose={() => {}}
      bodyCSS={css`
        height: 300px;
        @media (max-width: 768px) {
          height: 100%;
        }
      `}>
      <CloseButton></CloseButton>
      <ModalScrollContents>{LONG_TEXT}</ModalScrollContents>
      <SubmitButtons></SubmitButtons>
    </CommonModal>
  )
}

var LONG_TEXT = `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam distinctio quaerat, quas, molestiae velit, excepturi commodi voluptatibus non ipsam tempore sunt. Aliquam fugit, omnis earum odio ab, aliquid, ducimus consequatur quod nulla fuga asperiores dicta? Vel itaque aliquam, placeat dignissimos expedita, eaque blanditiis enim numquam quia rem repellendus dolores assumenda eum eveniet corrupti at distinctio doloremque earum aut amet odit culpa quam nulla accusantium. Ad culpa repellat voluptas. Quidem architecto saepe optio sit reiciendis! Velit, culpa? Eos expedita minima numquam, corporis possimus quo fugit placeat fuga! Quas, harum unde officia illum ratione mollitia consequatur! Aut placeat voluptates illum doloribus aperiam modi ipsa mollitia repellendus aliquid laborum. Ullam corporis iure explicabo cum inventore vel dolore numquam, laudantium possimus iusto quia perferendis ab ex odio atque eius a suscipit aperiam soluta, cumque beatae quis temporibus magnam. Accusantium pariatur perferendis repellendus asperiores consequuntur iusto omnis hic consectetur. Ipsum saepe consequuntur rem expedita provident natus mollitia est laborum, quidem quod? Veritatis fugiat culpa explicabo maiores consequatur provident doloribus porro facere, quisquam neque voluptatum quas alias assumenda illo consectetur id, praesentium omnis ex temporibus repellendus est odio nesciunt. Dolore nulla id, ex sed voluptatem ducimus esse quas repudiandae quam reprehenderit laborum. Adipisci voluptatum maxime dolore itaque vel a ipsa vero amet eaque esse voluptate, natus, quod et! Vitae soluta quis possimus eligendi ad odit itaque, debitis saepe harum in blanditiis iure. At consequatur necessitatibus error expedita quae maiores, ullam nobis voluptatibus blanditiis dolorum consectetur excepturi cum! Architecto illo modi accusantium est quae, vero magni animi omnis corrupti fugit laborum necessitatibus et quia facilis consequatur reprehenderit saepe eos, eaque enim ex quod quaerat tenetur iste provident. Qui quo dignissimos, eaque, explicabo ducimus rerum quasi culpa mollitia adipisci cum velit quos eveniet. Dolore nisi cumque consequuntur iusto, inventore expedita. Fugiat nisi totam, voluptatum asperiores soluta tempore eos facilis veritatis id sed quibusdam earum, maiores accusamus labore, quo iste culpa deserunt? Cumque, repellat aspernatur! Veniam voluptates doloremque, sed a omnis eius illo ipsa est ratione cum molestiae sequi cupiditate consequatur aliquid eaque eligendi fugit nisi accusantium, possimus alias vel. Quidem officia distinctio accusantium provident vero facere reprehenderit quae laudantium quis expedita at qui deleniti quo quia, cum obcaecati perferendis necessitatibus atque porro nesciunt placeat repudiandae totam exercitationem? Harum quae distinctio consequatur ut temporibus sint. Fugit consectetur reprehenderit debitis saepe veniam reiciendis. Quod consequuntur dolor accusamus reiciendis doloribus voluptatibus tempora saepe esse. Voluptatibus, eius temporibus numquam nemo quia quasi?`
