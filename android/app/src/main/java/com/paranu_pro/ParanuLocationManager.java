package com.paranu_pro;

import android.Manifest;
import android.annotation.TargetApi;
import android.content.Context;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import javax.annotation.Nonnull;

public class ParanuLocationManager extends ReactContextBaseJavaModule {

    private static LocationManager locationManager;
    static Callback locationCallBack;
    private static double latitued = 0;
    private static double logitude = 0;
    private static ReactApplicationContext context;



    private static final LocationListener mLocationListener = new LocationListener() {
        @Override
        public void onLocationChanged(final Location location) {
            //your code here
            latitued = location.getLatitude();
            logitude = location.getLongitude();
            locationCallBack.invoke(null, latitued, logitude);
        }

        @Override
        public void onStatusChanged(String provider, int status, Bundle extras) {
            locationCallBack.invoke("onStatusChanged", "onStatusChanged", "onStatusChanged");
        }

        @Override
        public void onProviderEnabled(String provider) {
            locationCallBack.invoke("onProviderEnabled", "onProviderEnabled", "onProviderEnabled");
        }

        @Override
        public void onProviderDisabled(String provider) {
            locationCallBack.invoke("onProviderDisabled", "onProviderDisabled", "onProviderDisabled");
        }
    };


    @TargetApi(Build.VERSION_CODES.M)
    public ParanuLocationManager(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
        locationManager = (LocationManager) reactContext.getSystemService(Context.LOCATION_SERVICE);

    }

    @Nonnull
    @Override
    public String getName() {
        return "ParanuLocationManager";
    }

    @ReactMethod
    public void getLocation(Callback callback) {
        locationCallBack = callback;
        getLocation();
    }


    private static void getLocation() {
        if (Build.VERSION.SDK_INT >= 23 &&
                context.checkSelfPermission(Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED &&
                context.checkSelfPermission(Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            // TODO: Consider calling
            //    Activity#requestPermissions
            // here to request the missing permissions, and then overriding
            //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
            //                                          int[] grantResults)
            // to handle the case where the user grants the permission. See the documentation
            // for Activity#requestPermissions for more details.

            ActivityCompat.requestPermissions(context.getCurrentActivity(), new String[] {
                            Manifest.permission.ACCESS_FINE_LOCATION,
                            Manifest.permission.ACCESS_COARSE_LOCATION },
                    111);

            return;
        }
        locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 10000000, 1000000000, mLocationListener);
    }

    public static void startObservingLocation() {
        getLocation();
    }
}
