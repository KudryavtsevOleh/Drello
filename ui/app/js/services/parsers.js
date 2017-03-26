"use strict";

(function () {
    angular
        .module("drello")
        .factory("parser", function () {
            return {
                parseFormsBeforeSave: function (forms) {
                    for (var i = 0, length = forms.length; i< length; i++) {
                        var form = forms[i];
                        for (var j = 0, dataLength = form.data.length; j < dataLength; j++) {
                            var data = form.data[j];
                            var parsedOmniValues = angular.toJson(data.omniOutput);
                            var parsedPdfValues = angular.toJson(data.pdfValue);
                            data.omniOutput = parsedOmniValues;
                            data.pdfValue = parsedPdfValues;
                        }
                    }
                },
                parseOmniKeysBeforeSave: function (keys, result) {
                    for (var i = 0, length = keys.length; i < length; i++) {
                        var record = keys[i];
                        result.data.push({
                            omniKey: record["0"],
                            synonym: record["1"]
                        });
                    }
                },
                parseMergedFormsInfo: function (forms, currentUserName) {
                    for (var i = 0, length = forms.length; i < length; i++) {
                        var form = forms[i];
                        var showMergedSign = false;
                        for (var j = 0, mLength = form.mergedForms.length; j < mLength; j++) {
                            var mergedInfo = form.mergedForms[j];
                            if (mergedInfo.userName == currentUserName) {
                                showMergedSign = true;
                                break;
                            }
                        }
                        form["showMergedSign"] = showMergedSign;
                    }
                }
            }
    })
}());