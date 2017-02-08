(function () {
    'use strict';

    angular
        .module('webAppCompiladores')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController($timeout, webDevTec, toastr) {
        var vm = this;

        vm.awesomeThings = [];
        vm.classAnimation = '';
        vm.creationDate = 1485913599463;
        vm.showToastr = showToastr;
        vm.logData = "Log information should be here...";

        activate();

        function activate() {
            getWebDevTec();
            $timeout(function () {
                vm.classAnimation = 'rubberBand';
            }, 4000);
        }

        function showToastr() {
            toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
            vm.classAnimation = '';
        }

        function getWebDevTec() {
            vm.awesomeThings = webDevTec.getTec();
            angular.forEach(vm.awesomeThings, function (awesomeThing) {
                awesomeThing.rank = Math.random();
            });
        }

        vm.click = function () {
            vm.idx = 0;
            vm.lexicErrorCount = 0;
            vm.lexicoDataError = [];
            //LEXICO GRAFICO
            if (!lexicoGrafico()) {
                //vm.logData = "Listos";
                program();
            } else {

                vm.logData = "Los siguientes tokens estan mal: " + vm.lexicoDataError;
            }


            //console.log(vm.textArray);
            //SINTACTICO

            //vm.logData = "Se reviso el string: " + vm.textArray;

        }

        function lexicoGrafico() {
            var errores = false;
            vm.tokens = ["program", "{", "}", "void", "if", "while", "iterate", "flip", "getCard", "putCard", "else", "isRed", "(", ")", "isBlack", "isHeart", "isClubs", "isDiamond", "isSpades", "isNotRed", "isNotBlack", "isNotHeart", "isNotClubs", "isNotDiamond", "isNotSpades", "<", ">", "<=", ">=", "==", "!=", "VALUE", "class"];

            vm.textArray = vm.textArea.replace(/\n/g, " ").split(" ");
            console.log(vm.textArray);
            //for loop del arreglo
            for (var i = 0; i <= vm.textArray.length - 1; i++) {
                console.log("PALABRA: " + vm.textArray[i]);
                console.log("Contains Check: " + vm.tokens.includes(vm.textArray[i]));
                console.log("Pure String check: " + pureString(vm.textArray[i]));
                console.log("Number check: " + isNumber(vm.textArray[i]));
                if (!(vm.tokens.includes(vm.textArray[i]) || pureString(vm.textArray[i]) || isNumber(vm.textArray[i]))) {
                    vm.lexicErrorCount++;
                    errores = true;
                    vm.lexicoDataError.push(vm.textArray[i]);
                    console.log("EL TOKEN: " + vm.textArray[i] + " es invalido");
                }
            }

            console.log(errores);
            return errores;
        }

        function pureString(data) {
            return !/\d/.test(data);
        }

        function isNumber(data) {
            return /^\d+$/.test(data);
        }

        function program() {
            //vm.textArray es el arreglo.
            console.log("Inicie");
            if (exigir("class")) {
                if (exigir("program")) {
                    if (exigir("{")) {
                        functions();
                        //main_function();
                        if (!exigir("}")) {
                            vm.logData = "No tiene '}'"
                            return
                            //alert("No tiene '}'")
                        }
                    } else {
                        vm.logData = "No tiene '{'"
                        return
                        //alert("No tiene '{'");
                    }
                } else {
                    vm.logData = "No tiene 'program'"
                    return
                    //alert("No tiene 'program'");
                }
            } else {
                vm.logData = "No tiene 'class'"
                return
                //alert("No tiene 'class'");
            }
            vm.logData = "Todo Chido"
            return

        }

        function functions() {
            if (verificar("void")) {
                funct();
                //functions_alpha();
            } else {
                //ERROR
                vm.logData = vm.logData + "No tiene 'program'"
            }
        }

        function funct() {
            if (exigir("void")) {
                name_function();
                if (exigir("(")) {
                    if (exigir(")")) {
                        if (exigir("{")) {
                            body();
                            if (!exigir("}")) {
                                alert();
                            }
                        } else {
                            alert();
                        }
                    } else {
                        alert();
                    }
                } else {
                    alert();
                }
            } else {
                alert();
            }
        }

        function exigir(data) {
            console.log("Exigir: " + data + " posicion Actual: " + vm.idx + " arreglo[" + vm.idx + "]= " + vm.textArray[vm.idx]);
            var res = vm.textArray[vm.idx] == data;
            vm.idx++;
            return res;

        }

        function verificar(data) {
            console.log("Verifico: " + data + " posicion Actual: " + vm.idx + " arreglo[" + vm.idx + "]= " + vm.textArray[vm.idx]);
            return vm.textArray[vm.idx] == data;
        }


    }
})();