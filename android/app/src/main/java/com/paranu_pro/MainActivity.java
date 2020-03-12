package com.paranu_pro;

import android.content.Intent;
import android.content.pm.PackageManager;

import androidx.annotation.NonNull;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Paranu";
    }

    @Override
    public void onNewIntent(Intent intent) {
                super.onNewIntent(intent);
               setIntent(intent);
           }
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
    }

//    @Override
//    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
////        ParanuLocationManager.locationCallBack.invoke("in the permistion result", "in the on permision", "in the onPermistion");
//        if (requestCode == 111 && hasAllPermissionGrandted(grantResults)) {
//            ParanuLocationManager.startObservingLocation();
//        } else {
////            locationCallBack.invoke("PERMISSION_DENIED", null, null);
////            ParanuLocationManager.locationCallBack.invoke("PERMISSION_DENIED", null, null);
//        }
//    }
//
//    private boolean hasAllPermissionGrandted(int[] grantResults) {
//        for (int grantResult : grantResults) {
//            if (grantResult == PackageManager.PERMISSION_DENIED) {
//                return false;
//            }
//        }
//        return true;
//    }

}
