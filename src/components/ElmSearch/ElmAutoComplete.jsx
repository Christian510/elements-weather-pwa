// import * as React from 'react';
// import { useAutocomplete } from '@mui/base/useAutocomplete';
// import { styled } from '@mui/system';


// const Label = styled('label')({
//   display: 'block',
// });

// const Input = styled('input')(({ theme }) => ({
//   width: 200,
//   backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
//   color: theme.palette.mode === 'dark' ? '#000' : '#fff',
// }));

// const Listbox = styled('ul')(({ theme }) => ({
//   width: 200,
//   margin: 0,
//   padding: 0,
//   zIndex: 1,
//   position: 'absolute',
//   listStyle: 'none',
//   backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
//   overflow: 'auto',
//   maxHeight: 200,
//   border: '1px solid rgba(0,0,0,.25)',
//   '& li.Mui-focused': {
//     backgroundColor: '#4a8df6',
//     color: 'white',
//     cursor: 'pointer',
//   },
//   '& li:active': {
//     backgroundColor: '#2977f5',
//     color: 'white',
//   },
// }));

// export default function UseAutocomplete() {


  // const {
  //   getRootProps,
  //   getInputLabelProps,
  //   getInputProps,
  //   getListboxProps,
  //   getOptionProps,
  //   groupedOptions,
  // } = useAutocomplete({
  //   id: 'custom-autocomplete',
  //   options: top100Films,
  //   getOptionLabel: (option) => option.title,
  // });
  // console.log('getRootProps: ', getRootProps());
  // console.log('getInputLabelProps; ', getInputLabelProps());
  // console.log('getInputProps: ', getInputProps());
  // console.log('getListboxProps: ', getListboxProps());
  // console.log('getOptionProps: ', getOptionProps());
  // console.log('groupdOptionProps: ', groupedOptions());
  // 1. Add search icon with default text.
  // 2. When a user touches the search input field hide the tile show a cancel button and disable the background weather list.
  // 3. onBlurr revert 2.
  // 4. When user types display an X icon on the right of the input. The "X", when touched, will clear the input flield, but not
  //    cencel the seach.
//   return (
//     <div>
//       <div {...getRootProps()}>
//         <Label {...getInputLabelProps()}>Elm Weather</Label>
//         <Input {...getInputProps()} />
//       </div>
//       {groupedOptions.length > 0 ? (
//         <Listbox {...getListboxProps()}>
//           {groupedOptions.map((option, index) => (
//             <li {...getOptionProps({ option, index })}>{option.title}</li>
//           ))}
//         </Listbox>
//       ) : null}
//     </div>
//   );
// }