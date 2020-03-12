import React, { Component } from "react";
import { StyleSheet, TextInput, Dimensions, Alert } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ImagePicker from "react-native-image-crop-picker";
import ImagePicker1 from 'react-native-image-picker';
import DatePicker from 'react-native-datepicker'
import ImageView from "../../component/common/ImageView";
import AntDesign from "react-native-vector-icons/AntDesign";
import EditProfileStyle from "./EditProfileStyle";
import Header from "../../component/common/Header";
import {
  DARK_APP_COLOR,
  BLACK_ALPHA,
  WHITE,
  OFF_WHITE,
  BLACK
} from "../../component/constant/Color";
import Route from "../../network/route";
import { url } from "../../component/constant/Url";
import * as Actions from "../../actions"; //Import your actions
import ActivityLoading from "../../component/common/ActivityLoading";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import strings from "../../screens/EditProfile/EditProfileLocalization";
import * as RNLocalize from 'react-native-localize';
import MediaMeta from 'react-native-media-meta';
const route = new Route(url);
const WIDTH = Dimensions.get("screen").width;


class EditProfile extends Component {
  constructor(props) {
    super(props);
    if(this.props.languageOfApp){
      strings.setLanguage(this.props.languageOfApp)
    }

    this.inputRefsBirth = {};
    this.inputRefsbirthDate = {};
    this.inputRefsOwnType = {};
    this.inputRefsOwnBreed = {};
    this.inputRefsOwnSize = {};
    this.inputRefsOwnSex = {};
    this.inputRefsLookingType = {};
    this.inputRefsLookingBreed = {};
    this.inputRefsLookingSize = {};
    this.inputRefsLookingSex = {};
    this.inputAgeType={};

    this.state = {
      petCategoryList: [
        { label: strings.bird, value: "Bird" },
        { label: strings.cat, value: "Cat" },
        { label: strings.cattle, value: "Cattle" },
        { label: strings.dog, value: "Dog" },
        { label:strings.fish, value: "Fish" },
        { label:strings.horse, value: "Horse" },
        { label:strings.miniPig, value: "Mini pig" },
        { label:strings.rabbit, value: "Rabbit" },
        { label:strings.rodent, value: "Rodent" },
        { label:strings.reptile, value: "Reptile" },
        { label:strings.other, value: "Other" }
      ],
      petAgeType: [
        { label: strings.months, value: "Months" },
        { label: strings.years, value: "Years" }
      ],
      petTypeList: [
        { label:strings.crossBreed, value: "Crossbreed" },
        { label:strings.pureBreed, value: "Purebred" },
        { label:strings.dontKnow, value: "Don't Know" }
      ],
      petSizeList: [
        { label:strings.small, value: "Small" },
        { label:strings.medium, value: "Medium" },
        { label: strings.big, value: "Big" },
        { label:strings.dosntMetter, value: "Doesn't matter" }
      ],
      petSexList: [
        { label: strings.male, value: "Male" },
        { label:strings.female, value: "Female" },
        { label:strings.dosntMetter, value: "Doesn't matter" }
      ],
      brief_info: this.props.yourPetInfo[this.props.indexOfPet]
        .briefInformation,
      userName: this.props.userDetail.name,
      petImages: this.props.yourPetInfo[this.props.indexOfPet].petImages,
      petVideo: this.props.yourPetInfo[this.props.indexOfPet].petVideo,
      petName: this.props.yourPetInfo[this.props.indexOfPet].name,
      birth: (this.props.yourPetInfo[this.props.indexOfPet].birth).replace('Years','').replace('Months',''),
      ownBreed: this.props.yourPetInfo[this.props.indexOfPet].type,
      birthAge:"",
      lookingBreed: "",
      ownPetType: this.props.yourPetInfo[this.props.indexOfPet].petCategory,
      lookingPetType: "",
      ownSize: this.props.yourPetInfo[this.props.indexOfPet].size,
      lookingSize: "",
      ownSex: this.props.yourPetInfo[this.props.indexOfPet].sex,
      lookingSex: "",
      city: this.props.yourPetInfo[this.props.indexOfPet].user.city,
      loading: false,
      imageuri: "",
      petImageUri: "",
      certificatesUri: "",
      petVideoUri:"",
      date:this.props.yourPetInfo[this.props.indexOfPet].birthDate,
      monthOrYear:this.props.yourPetInfo[this.props.indexOfPet].birth.includes('Years')? 'Years': 'Months',
    };
  }

  componentDidMount() {
    if (this.props.yourPetInfo[this.props.indexOfPet].interest) {
      this.setState({
        lookingBreed: this.props.yourPetInfo[this.props.indexOfPet].interest
          .type,
        lookingPetType: this.props.yourPetInfo[this.props.indexOfPet].interest
          .petCategory,
        lookingSize: this.props.yourPetInfo[this.props.indexOfPet].interest
          .size,
        lookingSex: this.props.yourPetInfo[this.props.indexOfPet].interest.sex
      });
    }
    if(this.props.languageOfApp){
      strings.setLanguage(this.props.languageOfApp)
    }
    countryInfo=RNLocalize.getLocales();
                switch (countryInfo[0].languageCode){
      case "sv":
      strings.setLanguage("sv")
      break;
      case "it":
      strings.setLanguage("it")
      break;
      case "fr":
      strings.setLanguage("fr")
      break;
      case "es":
      strings.setLanguage("es")
      break;
      case "de":
      strings.setLanguage("ddr")
      break;
      case "ru":
      strings.setLanguage("ru")
      break;
      case "pt":
      strings.setLanguage("es");
      break;
      case "tt":
      strings.setLanguage("ru");
      break;
      default :
      strings.setLanguage("en")
      break;
    }
  }

  imagePickerFromGallary(belongs,params) {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      compressImageQuality: 0.8
    }).then(image => {
      //console.log("imagePath", image.path);
      if (belongs == "user") {
        this.setState({ imageuri: image.path });
        Alert.alert(

          strings.doyouwanttosaveit,
          '',
          [
            {
              text: strings.cancel,
              onPress: () => this.setState({certificatesUri:'',petImageUri:'',imageuri:'',petVideoUri:''})
            },
            {text: strings.ok , onPress: () => this.uploadImageAndFile()},
          ],
          {cancelable: true},
        );

      } else if (belongs == "certificates") {
        this.setState({ certificatesUri: image.path });
        Alert.alert(

          strings.doyouwanttosaveit,
          '',
          [
            {
              text: strings.cancel,
              onPress: () => this.setState({certificatesUri:'',petImageUri:'',imageuri:''})
            },
            {text: strings.ok , onPress: () => this.uploadImageAndFile()},
          ],
          {cancelable: true},
        );
      } else if (belongs == "video") {
              this.setState({ petVideoUri: image.path });
              Alert.alert(

                strings.doyouwanttosaveit,
                '',
                [
                  {
                    text: strings.cancel,
                    onPress: () => this.setState({certificatesUri:'',petImageUri:'',imageuri:'',petVideoUri:''})
                  },
                  {text: strings.ok , onPress: () => this.uploadImageAndFile()},
                ],
                {cancelable: true},
              );
      } else {
        this.setState({ petImageUri: image.path });
        Alert.alert(

          strings.doyouwanttosaveit,
          '',
          [
            {
              text: strings.cancel,
              onPress: () => this.setState({certificatesUri:'',petImageUri:'',imageuri:''})
            },
            {text: strings.ok , onPress: () => this.uploadImageAndFile()},
          ],
          {cancelable: true},
        );
      }

    });
  }
  videoPickerFromGallary(belongs,params) {
   // More info on all the options is below in the API Reference... just some common use cases shown here
   const options = {
      durationLimit: 7, // 5 mins - Works only when you are recording
      mediaType: 'video',
      takePhotoButtonTitle:'',
      title: strings.title,
      chooseFromLibraryButtonTitle: strings.chooseFromLibraryButtonTitle,
      cancelButtonTitle: strings.cancel
  };

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
     // after you take the video...
   ImagePicker1.showImagePicker(options, (video) => {
     if(video){
       const path = video.path; // for android
      // const path = video.uri.substring(7) // for ios
       const maxTime = 7000; // 7 sec
       if(path){
         MediaMeta.get(path)
           .then((metadata) => {
             //console.log(metadata.duration);
             if (metadata.duration > maxTime ) {
               Alert.alert(
                 strings.videoAlertTitle,
                 strings.videoAlerttxt,
                 [
                   { text: 'OK', onPress: () => console.log('OK Pressed') }
                 ],
                 { cancelable: false }
               );
             } else {
               // Upload or do something else
               if (belongs == "user") {
                 this.setState({ imageuri: path });
                 Alert.alert(

                   strings.doyouwanttosaveit,
                   '',
                   [
                     {
                       text: strings.cancel,
                       onPress: () => this.setState({certificatesUri:'',petImageUri:'',imageuri:'',petVideoUri:''})
                     },
                     {text: strings.ok , onPress: () => this.uploadImageAndFile()},
                   ],
                   {cancelable: true},
                 );

               } else if (belongs == "certificates") {
                 this.setState({ certificatesUri: path });
                 Alert.alert(

                   strings.doyouwanttosaveit,
                   '',
                   [
                     {
                       text: strings.cancel,
                       onPress: () => this.setState({certificatesUri:'',petImageUri:'',imageuri:''})
                     },
                     {text: strings.ok , onPress: () => this.uploadImageAndFile()},
                   ],
                   {cancelable: true},
                 );
               } else if (belongs == "video") {
                       this.setState({ petVideoUri: "file://"+path });
                       Alert.alert(

                         strings.doyouwanttosaveit,
                         '',
                         [
                           {
                             text: strings.cancel,
                             onPress: () => this.setState({certificatesUri:'',petImageUri:'',imageuri:'',petVideoUri:''})
                           },
                           {text: strings.ok , onPress: () => this.uploadImageAndFile()},
                         ],
                         {cancelable: true},
                       );
               } else {
                 this.setState({ petImageUri: path });
                 Alert.alert(

                   strings.doyouwanttosaveit,
                   '',
                   [
                     {
                       text: strings.cancel,
                       onPress: () => this.setState({certificatesUri:'',petImageUri:'',imageuri:''})
                     },
                     {text: strings.ok , onPress: () => this.uploadImageAndFile()},
                   ],
                   {cancelable: true},
                 );
               }
             }
           }).catch(err => console.error(err));
         }
       }
       });



      // ImagePicker.openPicker({
      //   mediaType: "video",
      // }).then(video => {
      //
      //
      //   if (belongs == "user") {
      //     this.setState({ imageuri: video.path });
      //     Alert.alert(
      //
      //       strings.doyouwanttosaveit,
      //       '',
      //       [
      //         {
      //           text: strings.cancel,
      //           onPress: () => this.setState({certificatesUri:'',petImageUri:'',imageuri:'',petVideoUri:''})
      //         },
      //         {text: strings.ok , onPress: () => this.uploadImageAndFile()},
      //       ],
      //       {cancelable: true},
      //     );
      //
      //   } else if (belongs == "certificates") {
      //     this.setState({ certificatesUri: video.path });
      //     Alert.alert(
      //
      //       strings.doyouwanttosaveit,
      //       '',
      //       [
      //         {
      //           text: strings.cancel,
      //           onPress: () => this.setState({certificatesUri:'',petImageUri:'',imageuri:''})
      //         },
      //         {text: strings.ok , onPress: () => this.uploadImageAndFile()},
      //       ],
      //       {cancelable: true},
      //     );
      //   } else if (belongs == "video") {
      //           this.setState({ petVideoUri: video.path });
      //           Alert.alert(
      //
      //             strings.doyouwanttosaveit,
      //             '',
      //             [
      //               {
      //                 text: strings.cancel,
      //                 onPress: () => this.setState({certificatesUri:'',petImageUri:'',imageuri:'',petVideoUri:''})
      //               },
      //               {text: strings.ok , onPress: () => this.uploadImageAndFile()},
      //             ],
      //             {cancelable: true},
      //           );
      //   } else {
      //     this.setState({ petImageUri: video.path });
      //     Alert.alert(
      //
      //       strings.doyouwanttosaveit,
      //       '',
      //       [
      //         {
      //           text: strings.cancel,
      //           onPress: () => this.setState({certificatesUri:'',petImageUri:'',imageuri:''})
      //         },
      //         {text: strings.ok , onPress: () => this.uploadImageAndFile()},
      //       ],
      //       {cancelable: true},
      //     );
      //   }
      //
      // }).catch((err) => {
      //   alert('error:', err)
      // });
    }
  getPetsUser(data) {
    var userId = this.props.userDetail._id;
    var token = this.props.userToken;
    route
      .getAuthenticated("user/" + JSON.parse(JSON.stringify(userId)), token)
      .then(async response => {
        if (response.error) {
          this.setState({ loading: false });
          Alert.alert(strings.internetIssue);
        } else {
          this.props.setYourPet(response.pets);
          if (data == "delete") {
            this.setState({ loading: false });
          } else {
            this.getAllPets();
          }
        }
      });
  }

  petInfoChange(){
    var form = new FormData();
    form.append("name", this.state.petName);
    form.append("birth", this.state.birth+" "+this.state.monthOrYear );
    form.append("birthDate", this.state.date);
    form.append("petCategory", this.state.ownPetType);
    form.append("type", this.state.ownBreed);
    form.append("size", this.state.ownSize);
    form.append("sex", this.state.ownSex);
    form.append("briefInformation", this.state.brief_info);

    route
      .UploadImage(
        "pet/" + this.props.yourPetInfo[this.props.indexOfPet]._id,
        form,
        this.props.userToken
      )
      .then(async response => {
        if (response.error) {
          this.setState({ loading: false });
          Alert.alert(strings.internetIssue, strings.alert1);
        } else {
            this.getPetsUser("edit");
        }
      });
  }

  onSavePress(params) {
    if(this.props.yourPetInfo[this.props.indexOfPet].interest){
      this.setState({ loading: true });
      var people = {
        petCategory: this.state.lookingPetType,
        type: this.state.lookingBreed,
        size: this.state.lookingSize,
        sex: this.state.lookingSex,
        interests: this.props.yourPetInfo[this.props.indexOfPet].interest
          .interests
      };
      route
        .put(
          "pet/" + params.petId + "/interest/" +  this.props.yourPetInfo[
            this.props.indexOfPet
          ].interest._id,
          people,
          this.props.userToken
        )
        .then(async response => {
          if (response.error) {
            this.setState({ loading: false });
            Alert.alert(strings.internetIssue, strings.alert1);
          } else {
            this.petInfoChange()
          }
        });
    }

    else{
      this.setState({loading:true})
      this.petInfoChange()
    }

  }
  deletePress(params, fileName, type) {
    if (
      this.props.yourPetInfo[this.props.indexOfPet].petImages.length > 1 ||
      type != "image"
    ) {
      Alert.alert(
        strings.deleteImage,
        "",
        [
          {
            text:strings.delete,
            onPress: () => this.deleteApi(params, fileName, type)
          },
          { text:strings.cancel }
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(strings.youNeedToHAveAtLeastOneImage);
    }
  }

  deleteApi(params, fileName, type) {
    this.setState({ loading: true });
    if (type == "image") {
      var people = { removeImage: fileName };
    }else if(type == "video"){
        var people = { removeVideo: fileName };
    } else {
      var people = { removeDoc: fileName };
    }

    route
      .put("pet/" + params.petId + "/removeasset", people, this.props.userToken)
      .then(async response => {
        if (response.error) {

          this.setState({ loading: false });
          Alert.alert(strings.internetIssue, strings.alert1);
        } else {
          this.getPetsUser("delete");
        }
      });
  }

  uploadImageAndFile() {
    this.setState({loading:true})
    var form = new FormData();
    var formUser = new FormData();
    if (this.state.certificatesUri != "") {
      var certificates = {
        uri: this.state.certificatesUri,
        type: "image/jpeg",
        name: "pet.jpg"
      };

      form.append("petDocs", certificates);
    }
    if (this.state.petVideoUri != "") {
          var video = {
            uri: this.state.petVideoUri,
            type: "video/mp4",
            name: "pet.mp4"
          };

          form.append("petVideo", video);
        }

    if (this.state.petImageUri != "") {
      var photo = {
        uri: this.state.petImageUri,
        type: "image/jpeg",
        name: "pet.jpg"
      };
      form.append("petImages", photo);
    }
    if (this.state.imageuri != "") {
      var photo = {
        uri: this.state.imageuri,
        type: "image/jpeg",
        name: "pet.jpg"
      };
      formUser.append("userImage", photo);
      this.userImageUpdate(formUser);
    }
    if (
      this.state.imageuri == "" ||
      this.state.certificatesUri != "" ||
      this.state.petVideoUri == "" ||
      this.state.petImageUri != ""
    ) {
      route
        .UploadImage(
          "pet/" + this.props.yourPetInfo[this.props.indexOfPet]._id,
          form,
          this.props.userToken
        )
        .then(async response => {
          this.setState({ loading: false });
          if (response.error) {
            Alert.alert(strings.internetIssue, strings.alert1);
          } else {
              this.setState({certificatesUri:'',petImageUri:'',petVideoUri:''})
              this.getPetsUser("delete")

          }
        })
        .done();
    }
  }
  userImageUpdate(formUser) {
    route
      .UploadImage(
        "user/" + this.props.userDetail._id,
        formUser,
        this.props.userToken
      )
      .then(async response => {
        this.setState({ loading: false });
        if (response.error) {
          Alert.alert(strings.internetIssue,strings.alert1);
        } else {
          this.props.alterJustUser(response);
          if (
            this.state.certificatesUri == "" ||
            this.state.petImageUri == "" ||
            this.state.petVideoUri == ""
          ) {
            if (
              this.state.certificatesUri == "" &&
              this.state.petImageUri == "" &&
              this.state.petVideoUri == ""
            ) {
              this.setState({loading:false})
            }
          }
        }
      })
      .done();
  }

  getAllPets() {
    var token = this.props.userToken;

    route.getAuthenticated("pet/", token).then(async response => {
      if (response.error) {
        Alert.alert(strings.internetIssue, strings.alert1);
      } else {
        this.props.getAllPets(response);
        this.setState({ loading: false });
        this.props.navigation.pop();
      }
    });
  }

  render() {
    var { params } = this.props.navigation.state;
    return (
      <EditProfileStyle.WrapperViewVertical>
        <Header
          iconName={"arrowleft"}
          iconColor={"white"}
          onPressButton={() => this.props.navigation.goBack()}
          headerText={strings.profile}
          textRightButton={strings.save}
          navBarBackgroundColor={DARK_APP_COLOR}
          onPressRightButton={() => this.onSavePress(params)}
        />
        <EditProfileStyle.MainViewScrollView>
          <EditProfileStyle.TopImageViewContainer
            onPress={() => {
              this.imagePickerFromGallary("user",params);
            }}
          >
            {this.state.imageuri != "" ? (
              <EditProfileStyle.InnerImageView
                source={{ uri: this.state.imageuri }}
              />
            ) : (
              <EditProfileStyle.InnerImageViewWithoutImage>
                <ImageView
                  urlImageUri={this.props.userDetail.userImage}
                  imageType={"externel"}
                  customStyle={{
                    height: 120,
                    width: 120,
                    borderRadius: 60,
                    borderColor: DARK_APP_COLOR,
                    borderWidth: 1,
                    alignSelf: "center"
                  }}
                />
                <MaterialIcons
                  name={"add-a-photo"}
                  color={WHITE}
                  size={60}
                  style={{ position: "absolute", alignSelf: "center" }}
                />
              </EditProfileStyle.InnerImageViewWithoutImage>
            )}
          </EditProfileStyle.TopImageViewContainer>
          <EditProfileStyle.TextUserName>
            {this.state.userName}
          </EditProfileStyle.TextUserName>
          <EditProfileStyle.FirstPetText>
            {strings.petImages}
          </EditProfileStyle.FirstPetText>
          <EditProfileStyle.PetImagesContainer>
            <EditProfileStyle.PetImagesFlatList
              bounces={false}
              horizontal={true}
              data={this.props.yourPetInfo[this.props.indexOfPet].petImages}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <EditProfileStyle.PetImagesInner>
                  <ImageView
                    urlImageUri={item}
                    customStyle={{ height: 80, width: 80, alignSelf: "center" }}
                    imageType={"external"}
                    deleteImage={true}
                    ondeletePress={() => {
                      this.deletePress(params, item, "image");
                    }}
                  />
                </EditProfileStyle.PetImagesInner>
              )}
            />
            {this.state.petImageUri != "" ? (
              <EditProfileStyle.InnerImageViewPet
                source={{ uri: this.state.petImageUri }}
              />
            ) : (
              this.props.yourPetInfo[this.props.indexOfPet].petImages.length <
                3 && (
                <EditProfileStyle.ImagePetAdd
                  onPress={() => this.imagePickerFromGallary("pet",params)}

                >
                  <MaterialIcons name={"add-a-photo"} color={WHITE} size={60} />
                </EditProfileStyle.ImagePetAdd>
              )
            )}
          </EditProfileStyle.PetImagesContainer>

          <EditProfileStyle.FirstPetText>
            {strings.petCertificates}
          </EditProfileStyle.FirstPetText>
          <EditProfileStyle.PetImagesContainer>
            {this.props.yourPetInfo[this.props.indexOfPet].petDocs.length >
            0 ? (
              <EditProfileStyle.PetImagesFlatList
                bounces={false}
                horizontal={true}
                data={this.props.yourPetInfo[this.props.indexOfPet].petDocs}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <EditProfileStyle.PetImagesInner>
                    <ImageView
                      urlImageUri={item}
                      customStyle={{
                        height: 80,
                        width: 80,
                        alignSelf: "center",
                      }}
                      imageType={"external"}
                      deleteImage={true}
                      ondeletePress={() => {
                        this.deletePress(params, item, "doc");
                      }}
                    />
                  </EditProfileStyle.PetImagesInner>
                )}
              />
            ) : (
              <EditProfileStyle.EmptyView />
            )}
            {this.state.certificatesUri != "" ? (
              <EditProfileStyle.InnerImageViewPet
                source={{ uri: this.state.certificatesUri }}
              />
            ) : (
              this.props.yourPetInfo[this.props.indexOfPet].petDocs.length <
                3 && (
                <EditProfileStyle.ImagePetAdd
                  onPress={() => this.imagePickerFromGallary("certificates",params)}
                >
                  <MaterialIcons name={"add-a-photo"} color={WHITE} size={60} />
                </EditProfileStyle.ImagePetAdd>
              )
            )}
          </EditProfileStyle.PetImagesContainer>

         <EditProfileStyle.FirstPetText>
                     {strings.petVideo}
                   </EditProfileStyle.FirstPetText>
                   <EditProfileStyle.PetImagesContainer>
                     {this.props.yourPetInfo[this.props.indexOfPet].petVideo.length >
                     0 ? (
                       <EditProfileStyle.PetImagesFlatList
                         bounces={false}
                         horizontal={true}
                         data={this.props.yourPetInfo[this.props.indexOfPet].petVideo}
                         keyExtractor={(item, index) => index.toString()}
                         renderItem={({ item }) => (
                           <EditProfileStyle.PetImagesInner>
                             <ImageView
                               urlImageUri="images/general/videothumb.png"
                               customStyle={{
                                 height: 80,
                                 width: 80,
                                 alignSelf: "center",
                               }}
                               imageType={"external"}
                               deleteImage={true}
                               ondeletePress={() => {
                                 this.deletePress(params, item, "video");
                               }}
                             />
                           </EditProfileStyle.PetImagesInner>
                         )}
                       />
                     ) : (
                       <EditProfileStyle.EmptyView />
                     )}
                     {this.state.petVideoUri != "" ? (
                       <EditProfileStyle.InnerImageViewPet
                         source={{ uri: this.state.petVideoUri }}
                       />
                     ) : (
                       this.props.yourPetInfo[this.props.indexOfPet].petVideo.length <
                         1 && (
                         <EditProfileStyle.ImagePetAdd
                           onPress={() => this.videoPickerFromGallary("video",params)}
                         >
                           <MaterialIcons name={"add-a-photo"} color={WHITE} size={60} />
                         </EditProfileStyle.ImagePetAdd>
                       )
                     )}
                   </EditProfileStyle.PetImagesContainer>



          <EditProfileStyle.DetailContainerView>
            <EditProfileStyle.HorizontalDetailInner style={styles.GreyShadow1}>
              <EditProfileStyle.DetailTitleText>
                {strings.petName}
              </EditProfileStyle.DetailTitleText>
              <EditProfileStyle.DetailText>
                {this.state.petName}
              </EditProfileStyle.DetailText>
            </EditProfileStyle.HorizontalDetailInner>
          </EditProfileStyle.DetailContainerView>
          <EditProfileStyle.DetailContainerView>
            <EditProfileStyle.HorizontalDetailInner style={styles.GreyShadow1}>
              <EditProfileStyle.DetailTitleText>
                {strings.petType}
              </EditProfileStyle.DetailTitleText>
              <EditProfileStyle.DownArrowImage>
                    <AntDesign name="caretdown" size={18} color={"black"} />
                  </EditProfileStyle.DownArrowImage>
              <RNPickerSelect
                placeholder={{
                  label: this.state.ownPetType === 'Bird'? strings.bird : this.state.ownPetType === 'Cat'? strings.cat : this.state.ownPetType === 'Cattle' ? strings.cattle : this.state.ownPetType === 'Dog' ? strings.dog : this.state.ownPetType === 'Fish' ? strings.fish : this.state.ownPetType === 'Horse' ? strings.horse : this.state.ownPetType === 'Mini pig' ? strings.miniPig : this.state.ownPetType === 'Rabbit' ? strings.rabbit : this.state.ownPetType === 'Rodent' ? strings.rodent : this.state.ownPetType === 'Reptile' ? strings.reptile : strings.other,
                  value: this.state.ownPetType,
                  color: BLACK_ALPHA
                }}
                placeholderTextColor={BLACK_ALPHA}
                hideIcon={true}
                items={this.state.petCategoryList}
                onValueChange={value => {
                  this.setState({
                    ownPetType: value
                  });
                }}
                style={{ ...pickerSelectStyles }}
                value={this.state.ownSize}
                ref={el => {
                  this.inputRefsOwnType.picker = el;
                }}
              />
            </EditProfileStyle.HorizontalDetailInner>
          </EditProfileStyle.DetailContainerView>

          <EditProfileStyle.DetailContainerView>
              <EditProfileStyle.HorizontalDetailInner style={styles.GreyShadow1}>
                <EditProfileStyle.DetailTitleText>
                  {strings.birthDate}
                </EditProfileStyle.DetailTitleText>
                  <DatePicker
                    style={{width: 320,color: "#ffffff",fontSize: 16,height: 50,marginTop: 10,borderRadius:10,borderColor:"#ffffff"}}
                    date={this.state.date}
                    mode="date"
                    format="YYYY-MM-DD"
                    maxDate={new Date()}
                    placeholder={strings.DatePlace}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        right: 0,
                        top: 4,
                        marginLeft: 0
                      },
                      dateInput: {
                          borderColor:"#ffffff",
                          borderRadius:10,
                          paddingRight: 40,
                          alignItems: "flex-end"
                      },


                      // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {this.setState({date: date});}}
                  />
          </EditProfileStyle.HorizontalDetailInner>
           </EditProfileStyle.DetailContainerView>


          <EditProfileStyle.DetailContainerView>
            <EditProfileStyle.HorizontalDetailInner style={styles.GreyShadow1}>
              <EditProfileStyle.DetailTitleText>
                {strings.breed}
              </EditProfileStyle.DetailTitleText>
              <EditProfileStyle.DownArrowImage>
                    <AntDesign name="caretdown" size={18} color={"black"} />
                  </EditProfileStyle.DownArrowImage>
              <RNPickerSelect
                placeholder={{
                  label: this.state.ownBreed === 'Crossbreed'? strings.crossBreed : this.state.ownBreed === 'Purebred'? strings.pureBreed : strings.dontKnow,
                  value: this.state.ownBreed,
                  color: BLACK_ALPHA
                }}
                placeholderTextColor={BLACK_ALPHA}
                hideIcon={true}
                items={this.state.petTypeList}
                onValueChange={value => {
                  this.setState({
                    ownBreed: value
                  });
                }}
                style={{ ...pickerSelectStyles }}
                value={this.state.ownBreed}
                ref={el => {
                  this.inputRefsOwnBreed.picker = el;
                }}
              />
            </EditProfileStyle.HorizontalDetailInner>
          </EditProfileStyle.DetailContainerView>
          <EditProfileStyle.DetailContainerView>
            <EditProfileStyle.HorizontalDetailInner style={styles.GreyShadow1}>
              <EditProfileStyle.DetailTitleText>
                {strings.size}
              </EditProfileStyle.DetailTitleText>
              <EditProfileStyle.DownArrowImage>
                    <AntDesign name="caretdown" size={18} color={"black"} />
                  </EditProfileStyle.DownArrowImage>
              <RNPickerSelect
                placeholder={{
                  label: this.state.ownSize === 'Small'? strings.small : this.state.ownSize === 'Medium'? strings.medium : this.state.ownSize === 'Big'? strings.big : strings.dosntMetter,
                  value: this.state.ownSize,
                  color: BLACK_ALPHA
                }}
                placeholderTextColor={BLACK_ALPHA}
                hideIcon={true}
                items={this.state.petSizeList}
                onValueChange={value => {
                  this.setState({
                    ownSize: value
                  });
                }}
                style={{ ...pickerSelectStyles }}
                value={this.state.ownSize}
                ref={el => {
                  this.inputRefsOwnSize.picker = el;
                }}
              />

            </EditProfileStyle.HorizontalDetailInner>
          </EditProfileStyle.DetailContainerView>
          <EditProfileStyle.DetailContainerView>
            <EditProfileStyle.HorizontalDetailInner style={styles.GreyShadow1}>
              <EditProfileStyle.DetailTitleText>
                {strings.sex}
              </EditProfileStyle.DetailTitleText>
              <EditProfileStyle.DownArrowImage>
                    <AntDesign name="caretdown" size={18} color={"black"} />
                  </EditProfileStyle.DownArrowImage>
              <RNPickerSelect
                placeholder={{
                  label: this.state.ownSex == 'Male'? strings.male : this.state.ownSex == 'Female'? strings.female : strings.dosntMetter,
                  value: this.state.ownSex,
                  color: BLACK_ALPHA
                }}
                placeholderTextColor={BLACK_ALPHA}
                hideIcon={true}
                items={this.state.petSexList}
                onValueChange={value => {
                  this.setState({
                    ownSex: value
                  });
                }}
                style={{ ...pickerSelectStyles }}
                value={this.state.size}
                ref={el => {
                  this.inputRefsOwnSex.picker = el;
                }}
              />
            </EditProfileStyle.HorizontalDetailInner>
          </EditProfileStyle.DetailContainerView>
          <EditProfileStyle.DetailContainerView>
            <EditProfileStyle.HorizontalDetailInner style={styles.GreyShadow1}>
              <EditProfileStyle.DetailTitleText>
                {strings.city}
              </EditProfileStyle.DetailTitleText>
              <EditProfileStyle.DetailText>
                {this.state.city}
              </EditProfileStyle.DetailText>
            </EditProfileStyle.HorizontalDetailInner>
          </EditProfileStyle.DetailContainerView>
          <EditProfileStyle.BriefInfoContainerView>
            <EditProfileStyle.BriefInfoInner style={styles.GreyShadow1}>
              <EditProfileStyle.BriefInfoHeadertext>
                {strings.BeriefInfo}
              </EditProfileStyle.BriefInfoHeadertext>
              <TextInput
                style={{ fontSize: 15, paddingHorizontal: 10, height: 100 }}
                multiline={true}
                maxLength={100}
                placeholder={strings.BeriefInfoPlace}
                numberOfLines={5}
                blurOnSubmit={true}
                onChangeText={brief_info => this.setState({ brief_info })}
                value={this.state.brief_info}
              />
            </EditProfileStyle.BriefInfoInner>
          </EditProfileStyle.BriefInfoContainerView>
          <EditProfileStyle.DividerLine />
          <EditProfileStyle.FirstPetText>
            {strings.lookingFor}
          </EditProfileStyle.FirstPetText>
          {this.props.yourPetInfo[this.props.indexOfPet].interest ? (
            <EditProfileStyle.LookingPetDetailContainer>
              <EditProfileStyle.DetailContainerView>
                <EditProfileStyle.HorizontalDetailInner
                  style={styles.GreyShadow1}
                >
                  <EditProfileStyle.DetailTitleText>
                    {strings.petType}
                  </EditProfileStyle.DetailTitleText>
                  <EditProfileStyle.DownArrowImage>
                    <AntDesign name="caretdown" size={18} color={"black"} />
                  </EditProfileStyle.DownArrowImage>
                  <RNPickerSelect
                    placeholder={{
                      label: this.state.lookingPetType === 'Bird'? strings.bird : this.state.lookingPetType === 'Cat'? strings.cat : this.state.lookingPetType === 'Cattle' ? strings.cattle : this.state.lookingPetType === 'Dog' ? strings.dog : this.state.lookingPetType === 'Fish' ? strings.fish : this.state.lookingPetType === 'Horse' ? strings.horse : this.state.lookingPetType === 'Mini pig' ? strings.miniPig : this.state.lookingPetType === 'Rabbit' ? strings.rabbit : this.state.lookingPetType === 'Rodent' ? strings.rodent : this.state.lookingPetType === 'Reptile' ? strings.reptile : strings.other,
                      value: this.state.lookingPetType,
                      color: BLACK_ALPHA
                    }}
                    placeholderTextColor={BLACK_ALPHA}
                    hideIcon={true}
                    items={this.state.petCategoryList}
                    onValueChange={value => {
                      this.setState({
                        lookingPetType: value
                      });
                    }}
                    style={{ ...pickerSelectStyles }}
                    value={this.state.lookingPetType}
                    ref={el => {
                      this.inputRefsLookingType.picker = el;
                    }}
                  />
                </EditProfileStyle.HorizontalDetailInner>
              </EditProfileStyle.DetailContainerView>
              <EditProfileStyle.DetailContainerView>
                <EditProfileStyle.HorizontalDetailInner
                  style={styles.GreyShadow1}
                >
                  <EditProfileStyle.DetailTitleText>
                    {strings.breed}
                  </EditProfileStyle.DetailTitleText>
                  <EditProfileStyle.DownArrowImage>
                    <AntDesign name="caretdown" size={18} color={"black"} />
                  </EditProfileStyle.DownArrowImage>
                  <RNPickerSelect
                    placeholder={{
                      label: this.state.lookingBreed === 'Crossbreed'? strings.crossBreed : this.state.lookingBreed === 'Purebred'? strings.pureBreed : strings.dontKnow,
                      value: this.state.lookingBreed,
                      color: BLACK_ALPHA
                    }}
                    placeholderTextColor={BLACK_ALPHA}
                    hideIcon={true}
                    items={this.state.petTypeList}
                    onValueChange={value => {
                      this.setState({
                        lookingBreed: value
                      });
                    }}
                    style={{ ...pickerSelectStyles }}
                    value={this.state.lookingPetType}
                    ref={el => {
                      this.inputRefsLookingBreed.picker = el;
                    }}
                  />
                </EditProfileStyle.HorizontalDetailInner>
              </EditProfileStyle.DetailContainerView>
              <EditProfileStyle.DetailContainerView>
                <EditProfileStyle.HorizontalDetailInner
                  style={styles.GreyShadow1}
                >
                  <EditProfileStyle.DetailTitleText>
                    {strings.size}
                  </EditProfileStyle.DetailTitleText>
                  <EditProfileStyle.DownArrowImage>
                    <AntDesign name="caretdown" size={18} color={"black"} />
                  </EditProfileStyle.DownArrowImage>
                  <RNPickerSelect
                    placeholder={{
                      label: this.state.lookingSize === 'Small'? strings.small : this.state.lookingSize === 'Medium'? strings.medium : this.state.lookingSize === 'Big'? strings.big : strings.dosntMetter,
                      value: this.state.lookingSize,
                      color: BLACK_ALPHA
                    }}
                    placeholderTextColor={BLACK_ALPHA}
                    hideIcon={true}
                    items={this.state.petSizeList}
                    onValueChange={value => {
                      this.setState({
                        lookingSize: value
                      });
                    }}
                    style={{ ...pickerSelectStyles }}
                    value={this.state.lookingSize}
                    ref={el => {
                      this.inputRefsLookingSize.picker = el;
                    }}
                  />
                </EditProfileStyle.HorizontalDetailInner>
              </EditProfileStyle.DetailContainerView>
              <EditProfileStyle.DetailContainerView>
                <EditProfileStyle.HorizontalDetailInner
                  style={styles.GreyShadow1}
                >
                  <EditProfileStyle.DetailTitleText>
                    {strings.sex}
                  </EditProfileStyle.DetailTitleText>
                  <EditProfileStyle.DownArrowImage>
                    <AntDesign name="caretdown" size={18} color={"black"} />
                  </EditProfileStyle.DownArrowImage>
                  <RNPickerSelect
                    placeholder={{
                      label: this.state.lookingSex == 'Male'? strings.male : this.state.lookingSex == 'Female'? strings.female : strings.dosntMetter,
                      value: this.state.lookingSex,
                      color: BLACK_ALPHA
                    }}
                    placeholderTextColor={BLACK_ALPHA}
                    hideIcon = {true}
                    items={this.state.petSexList}
                    onValueChange={value => {
                      this.setState({
                        lookingSex: value
                      });
                    }}
                    style={{ ...pickerSelectStyles }}
                    value={this.state.lookingSex}
                    ref={el => {
                      this.inputRefsLookingSex.picker = el;
                    }}
                  />
                </EditProfileStyle.HorizontalDetailInner>
              </EditProfileStyle.DetailContainerView>
              <EditProfileStyle.ChangeInterestContainer>
                <EditProfileStyle.ChangeInterestButton
                  onPress={() => {
                    var people = {
                      petCategory: this.state.lookingPetType,
                      type: this.state.lookingBreed,
                      size: this.state.lookingSize,
                      sex: this.state.lookingSex
                    };
                    this.props.navigation.push("Interest", {
                      dataToSend: people,
                      recentPath: "editProfile",
                      petId: params.petId,
                      interestPetId: this.props.yourPetInfo[
                        this.props.indexOfPet
                      ].interest._id
                    });
                  }}
                >
                  <EditProfileStyle.ChangeInterestText>
                    {strings.changeInterest}
                  </EditProfileStyle.ChangeInterestText>
                </EditProfileStyle.ChangeInterestButton>
              </EditProfileStyle.ChangeInterestContainer>
            </EditProfileStyle.LookingPetDetailContainer>
          ) : (
            <EditProfileStyle.ChangeInterestContainer>
              <EditProfileStyle.ChangeInterestButton
                onPress={() => {
                  this.props.navigation.push("PetULookingFor", {
                    petId: this.props.yourPetInfo[this.props.indexOfPet]._id,
                    recentPath: "profile"
                  });
                }}
              >
                <EditProfileStyle.ChangeInterestText>
                  {strings.addInterest}
                </EditProfileStyle.ChangeInterestText>
              </EditProfileStyle.ChangeInterestButton>
            </EditProfileStyle.ChangeInterestContainer>
          )}
        </EditProfileStyle.MainViewScrollView>
        {this.state.loading && <ActivityLoading loading={true} />}
      </EditProfileStyle.WrapperViewVertical>
    );
  }
}
const styles = StyleSheet.create({
  GreyShadow: {
    shadowOffset: { width: 0, height: 3.5 },
    shadowColor: "grey",
    shadowOpacity: 1,
    elevation: 3
  },
  GreyShadow1: {
    shadowOffset: { width: 0, height: 1 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    elevation: 3

  }

});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    color: BLACK_ALPHA,
    height: 50,
    marginRight: 35,

  },
  inputAndroid: {
    paddingTop: 13,
    paddingHorizontal: 43,
    paddingBottom: 12,
    borderRadius: 4,
    color: BLACK_ALPHA,
    right: 15,
    borderColor: 'red'
  }
});

function mapStateToProps(state, props) {
  return {
    userDetail: state.user.userDetail,
    showIndicator: state.user.loading,
    userToken: state.user.userToken,
    yourPetInfo: state.pet.yourPetDetail,
    indexOfPet: state.pet.petIndex,
    languageOfApp: state.appState.languageOfApp,

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile);
