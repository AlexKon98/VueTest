/* eslint-disable */
import eventBus from '@/eventBus';

export default function gotoPage(pageParams) {
  eventBus.$emit('gotoPage', pageParams);
}
