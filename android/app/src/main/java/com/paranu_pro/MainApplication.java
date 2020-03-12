package com.paranu_pro;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.imagepicker.ImagePickerPackage;
import com.mybigday.rnmediameta.RNMediaMetaPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.showlocationservicesdialogbox.LocationServicesDialogBoxPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactcommunity.rnlocalize.RNLocalizePackage;
import com.babisoft.ReactNativeLocalization.ReactNativeLocalizationPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.devfd.RNGeocoder.RNGeocoderPackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {


  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
              new MainReactPackage(),
            new ImagePickerPackage(),
            new RNMediaMetaPackage(),
            new ReactVideoPackage(),
              new LocationServicesDialogBoxPackage(),
              new VectorIconsPackage(),
              new RNLocalizePackage(),
              new ReactNativeLocalizationPackage(),
              new PickerPackage(),
              new RNGestureHandlerPackage(),
              new RNGeocoderPackage(),
              new FIRMessagingPackage(),
              new FBSDKPackage()
//              new ParanuPackages()

      );
    }
    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, false);
  }
}