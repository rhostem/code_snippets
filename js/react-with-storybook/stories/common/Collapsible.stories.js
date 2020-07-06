import React from 'react'
import styled from 'styled-components'
import {
  withKnobs,
  text,
  boolean,
  number,
  color,
  select,
} from '@storybook/addon-knobs'
import Collapsible from '../../common/Collapsible'

export default {
  title: 'common/Collapsible',
  decorators: [withKnobs],
}

export const Default = () => {
  return (
    <Collapsible
      initialOpen={false}
      renderHead={({ isOpen, toggleOpen }) => {
        return (
          <div>
            <div>click button to open</div>
            <button onClick={toggleOpen}>toggle</button>
          </div>
        )
      }}
    >
      <div style={{ width: '400px' }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
        voluptates modi cum quas, quod dignissimos deleniti corrupti provident
        possimus? Perspiciatis dolor repellendus corrupti cumque assumenda, sed,
        dolores et recusandae sint, beatae architecto quae laudantium! Labore
        aliquid repellat eius cumque perspiciatis sapiente dolorem beatae!
        Nesciunt ipsam id quo excepturi saepe autem. Voluptatibus vitae
        reprehenderit quos ut? Praesentium aut iste mollitia enim ab,
        repudiandae omnis consequuntur excepturi dolorum quaerat quos maxime
        accusamus reprehenderit ratione est reiciendis natus voluptate nemo modi
        ad, eligendi sapiente amet possimus assumenda! Officiis deleniti,
        eligendi aliquam facilis quas provident mollitia iure culpa rerum nihil
        deserunt sunt nisi odit!
      </div>
    </Collapsible>
  )
}

const NestedBox = styled.div`
  padding: 1em;
  border: 1px solid #efefef;
  display: block;
`
export const Nested = () => {
  return (
    <>
      <Collapsible
        initialOpen={false}
        renderHead={({ isOpen, toggleOpen }) => {
          return (
            <NestedBox style={{ background: '#e6ebf1' }} onClick={toggleOpen}>
              Level 1 {isOpen ? '-' : '+'}
            </NestedBox>
          )
        }}
      >
        <Collapsible
          initialOpen={false}
          renderHead={({ isOpen, toggleOpen }) => (
            <NestedBox
              style={{ background: '#0D47A1', color: '#fff' }}
              onClick={toggleOpen}
            >
              Level2 {isOpen ? '-' : '+'}
            </NestedBox>
          )}
        >
          <NestedBox>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate,
            nam? Possimus eveniet minus deserunt asperiores porro excepturi ad
            praesentium debitis quos voluptatem omnis, dicta enim modi expedita
            vero ipsa fugit nisi natus. Qui sapiente vel rerum repudiandae
            corporis. Odit, necessitatibus officia eaque, nam sequi libero
            consequuntur eveniet debitis, quo incidunt quos iure corrupti? Unde
            voluptates velit libero doloribus aut molestias, incidunt numquam
            ducimus culpa, rerum, eveniet iste cumque. Repellendus officiis
            quisquam iste maiores recusandae, non at! Fugiat placeat itaque ab,
            exercitationem accusamus molestiae atque blanditiis eligendi magnam.
            Facere velit accusamus aperiam quasi voluptas autem, nemo sequi
            magnam porro id consequuntur?
          </NestedBox>
        </Collapsible>
        <Collapsible
          initialOpen={false}
          renderHead={({ isOpen, toggleOpen }) => (
            <NestedBox
              style={{ background: '#580E8B', color: '#fff' }}
              onClick={toggleOpen}
            >
              Level2 {isOpen ? '-' : '+'}
            </NestedBox>
          )}
        >
          <NestedBox>
            <div>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Voluptate, nam? Possimus eveniet minus deserunt asperiores porro
              excepturi ad praesentium debitis quos voluptatem omnis, dicta enim
              modi expedita vero ipsa fugit nisi natus. Qui sapiente vel rerum
              repudiandae corporis. Odit, necessitatibus officia eaque, nam
              sequi libero consequuntur eveniet debitis, quo incidunt quos iure
              corrupti? Unde voluptates velit libero doloribus aut molestias,
              incidunt numquam ducimus culpa, rerum, eveniet iste cumque.
              Repellendus officiis quisquam iste maiores recusandae, non at!
              Fugiat placeat itaque ab, exercitationem accusamus molestiae atque
              blanditiis eligendi magnam. Facere velit accusamus aperiam quasi
              voluptas autem, nemo sequi magnam porro id consequuntur?
            </div>
            <div>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non,
              aperiam?
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo,
                quidem.
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo,
                quidem.
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo,
                quidem.
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo,
                quidem.
              </p>
            </div>
          </NestedBox>
        </Collapsible>
      </Collapsible>
    </>
  )
}
