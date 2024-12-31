import { Box, FormControl, FormControlLabel, Switch, Typography } from '@mui/material';

interface SwitchFieldProps {
	checked: boolean;
	helperText?: string;
	label: string;
	onChange: (checked: boolean) => void;
}

const SwitchField = ({ label, checked = true, onChange, helperText }: SwitchFieldProps) => {
	return (
		<FormControl component="fieldset" fullWidth>
     <Box
       sx={{
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'space-between',
         p: 1.5,
         borderRadius: 2,
         backgroundColor: checked ? 'primary.light' : 'grey.200',
         transition: 'background-color 0.3s ease',
         boxShadow: theme => `0 2px 8px ${theme.palette.action.hover}`,
         '&:hover': {
           boxShadow: theme => `0 4px 12px ${theme.palette.action.hover}`,
         }
       }}
     >
       <Typography variant="body1" sx={{ fontWeight: 500, color: checked ? 'primary.contrastText' : 'text.primary' }}>
         {label}
       </Typography>
       <FormControlLabel
         control={
           <Switch
             checked={checked}
             onChange={(e) => onChange(e.target.checked)}
             color="primary"
           />
         }
         label=""
         sx={{ m: 0 }}
       />
     </Box>
     {helperText && (
       <Typography variant="caption" color="textSecondary" sx={{ mt: 1 }}>
         {helperText}
       </Typography>
     )}
   </FormControl>
	);
};
export default SwitchField;
