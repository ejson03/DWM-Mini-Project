import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function Penalty() {
  const [value, setValue] = React.useState('l1');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Penalty</FormLabel>
      <RadioGroup aria-label="penalty" name="penalty" value={value} onChange={handleChange}>
        <FormControlLabel value="l1" control={<Radio />} label="L1" />
        <FormControlLabel value="l2" control={<Radio />} label="L2" />
      </RadioGroup>
    </FormControl>
  );
}
