
package com.visitingcardscanner.RNTextDetector;

import androidx.annotation.NonNull;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.bridge.JavaScriptModule;
import com.visitingcardscanner.RNTextDetector.RNTextDetectorModule;

public class RNTextDetectorPackage implements ReactPackage {
   @Override
   public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
       return Collections.emptyList();
   }

   @Override
   public List<NativeModule> createNativeModules(
           @NonNull ReactApplicationContext reactContext) {
           List<NativeModule> modules = new ArrayList<>();

           modules.add(new RNTextDetectorModule(reactContext));

           return modules;
   }
}