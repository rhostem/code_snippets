import { CSSProperties } from '@material-ui/core/styles/withStyles';

export default function textEllipsis(): CSSProperties {
  return {
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };
}
