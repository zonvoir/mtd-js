export const getIndustryModified = (industryArr) => {
  let industries1 = [];
  for (var k = 0; k < industryArr.length; k++) {
    let indus = {
      value: industryArr[k].id,
      label: industryArr[k].name,
    };
    industries1.push(indus);
  }
  return industries1;
};
export const getSeniorityModified = (seniorityArr) => {
  let seniorityLevelArr = [];
  for (var k = 0; k < seniorityArr.length; k++) {
    let level = {
      value: seniorityArr[k].id,
      label: seniorityArr[k].level,
    };
    seniorityLevelArr.push(level);
  }
  return seniorityLevelArr;
};
export const getCategoryModified = (categoryArr) => {
  let categoryArray = [];
  for (var k = 0; k < categoryArr.length; k++) {
    let level = {
      value: categoryArr[k].id,
      label: categoryArr[k].name,
    };
    categoryArray.push(level);
  }
  return categoryArray;
};

//  get first letter of string
export const getFirstLetter = (str) => {
  return str.charAt(0).toUpperCase();
};
//  genrate random hex color code
export const setRandomBG = () => {
  var letters = "0123456789ABCDEF";
  // html color code starts with #
  var color = "#";

  // generating 6 times as HTML color code consist
  // of 6 letter or digits
  for (var i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
  return color;
};
export const setRandomBackground = () => {
  let backgrounds = ["#0ACA8A", "#FFC94D", "#2E3A59"];
  let background = backgrounds[Math.floor(Math.random() * backgrounds.length)];
  return background;
};
// get image free size 100*100
// onFilePicked(event) {
//     this.valiImage = true;
//     const files = event.target.files;
//     // let file = files[0];
//     let $th = this;
//     console.log("seelcted Files", files);
//     if (files != "undefined" && files.length > 0) {
//       var reader = new FileReader();
//       reader.readAsDataURL(files[0]);
//       reader.onload = function (e) {
//         var image = new Image(); //Set the Base64 string return from FileReader as source.
//         image.src = e.target.result;
//         // console.log(image.height, image.width);
//         image.onload = function () {
//           //Determine the Height and Width.
//           var height = this.height;
//           var width = this.width;
//             $th.uploadCompanyLogo(files[0]);
//           // if (height === 100 && width === 100) {
//           //   // $th.valiImage = true;
//           //   // $th.$refs.uploader.validate();
//           //   return true;
//           // } else {
//           //   $th.defaultImg = "icons/cloud-upload.svg";
//           //   $th.valiImage = false;
//           //   // $th.$refs.uploader.validate();
//           //   return false;
//           // }
//         };
//       };
//     } else {
//       return true;
//     }
//   },
