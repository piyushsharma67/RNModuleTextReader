
package com.visitingcardscanner.RNTextDetector;

import android.graphics.Rect;
import android.net.Uri;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.mlkit.vision.common.InputImage;
import com.google.mlkit.vision.text.Text;
import com.google.mlkit.vision.text.TextRecognition;
import com.google.mlkit.vision.text.TextRecognizer;
import com.google.mlkit.vision.text.latin.TextRecognizerOptions;

import java.io.File;
import java.io.IOException;
import java.net.URI;

public class RNTextDetectorModule extends ReactContextBaseJavaModule {

      private final ReactApplicationContext reactContext;

      private TextRecognizer recognizer;
      private InputImage image;
      private Uri uri;

    @Override
    public String getName() {
        return "RNTextDetector";
    }

  public RNTextDetectorModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        try {
            recognizer=TextRecognition.getClient(TextRecognizerOptions.DEFAULT_OPTIONS);
        }
        catch (IllegalStateException e) {
            e.printStackTrace();
        }
  }

  @ReactMethod
    public void detectFromUri(String imageUri, final Promise promise) {
        try {

            uri= Uri.parse(imageUri);
            System.out.println(imageUri);
            image = InputImage.fromFilePath(this.reactContext,uri);

            Task<Text> result1=recognizer.process(image)
                    .addOnSuccessListener(new OnSuccessListener<Text>() {
                        @Override
                        public void onSuccess(Text text) {
                            promise.resolve(getDataAsArray(text));
                        }
                    }
                    ).addOnFailureListener(new OnFailureListener() {
                        @Override
                        public void onFailure(@NonNull Exception e) {
                            e.printStackTrace();
                            promise.reject(e);
                        }
                    }
            );
        } catch (IOException e) {
            promise.reject(e);
            e.printStackTrace();
        }
    }

    /**
     * Converts parsedText into a map
     *
     * @param parsedText
     * @return
     */
    private WritableArray getDataAsArray(Text parsedText) {
        WritableArray data = Arguments.createArray();
        WritableMap info = Arguments.createMap();
        WritableMap coordinates = Arguments.createMap();

        for (Text.TextBlock block: parsedText.getTextBlocks()) {
            info = Arguments.createMap();
           
            info.putString("text", block.getText());
            data.pushMap(info);
        }

        return data;
    }



}
