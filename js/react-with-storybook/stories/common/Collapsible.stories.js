import React from 'react'
import {
  withKnobs,
  text,
  boolean,
  number,
  color,
  select,
} from '@storybook/addon-knobs'
import Collapsible, { useToggleOpen } from '../../common/Collapsible'

export default {
  title: 'common/Collapsible',
  decorators: [withKnobs],
}

export const Default = () => {
  const { isOpen, toggleOpen } = useToggleOpen(false)

  return (
    <Collapsible
      isOpen={isOpen}
      renderHead={() => {
        return (
          <div>
            <div>click button to open</div>
            <button onClick={toggleOpen}>toggle</button>
          </div>
        )
      }}>
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
