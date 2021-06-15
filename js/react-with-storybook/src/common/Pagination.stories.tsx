import React from 'react';
import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Pagination, { Props } from './Pagination';

export default {
  title: 'components/Pagination',
  component: Pagination,
};

const Template: Story<Props> = (args) => <Pagination {...args} />;

export const Primary = Template.bind({});
Primary.decorators = [];
Primary.args = {
  onChange: action('onChange'),
  initialPage: 1,
  lastPage: 114,
  initialPageSize: 10,
  navigation: 'dynamic',
};

Primary.argTypes = {
  navigation: {
    defaultValue: 'dynamic',
    control: {
      type: 'select',
      options: ['dynamic', 'static'],
    },
  },
};
