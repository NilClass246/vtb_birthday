/*
Title: Localization
Author: DKPlugins
Site: https://dk-plugins.ru
E-mail: kuznetsovdenis96@gmail.com
Version: 5.3.1
Release: 30.03.2021
First release: 28.08.2016
*/

/*ru
Название: Локализация
Автор: DKPlugins
Сайт: https://dk-plugins.ru
E-mail: kuznetsovdenis96@gmail.com
Версия: 5.3.1
Релиз: 30.03.2021
Первый релиз: 28.08.2016
*/

/*:
 * @plugindesc v.5.3.1 [MV] Localization of game.
 * @author DKPlugins
 * @url https://dk-plugins.ru
 * @target MV
 * @base DKTools
 * @orderAfter DKTools
 * @help

 ### Info about plugin ###
 Title: DKTools_Localization
 Author: DKPlugins
 Site: https://dk-plugins.ru
 Version: 5.3.1
 Release: 30.03.2021
 First release: 28.08.2016

 ###===========================================================================
 ## Requirements and dependencies
 ###===========================================================================
 Availability of working plugin DKTools version 10.0.4 or above

 ###===========================================================================
 ## Known issues
 ###===========================================================================
 1. Special message characters for changing font sizes \{ and \} do not work
 Solution: use added special characters
 \MFS - Decrease font size (analogue \})
 \MFB - Increase font size (analogue \{)

 ###===========================================================================
 ## Demo
 ###===========================================================================
 https://dk-plugins.ru/mv/system/localization/

 ###===========================================================================
 ## MZ version
 ###===========================================================================
 https://dk-plugins.ru/mz/system/localization/

 ###===========================================================================
 ## Special compatibility with other plugins
 ###===========================================================================
 The plugin is compatible with most other plugins,
 but plugins that do not work with localization can still be included.
 I add the compatibility of these plugins. For compatibility to work properly,
 plugins from the following list must be placed ABOVE the localization plugin:
 YEP_MessageCore.js
 YEP_OptionsCore.js
 YEP_QuestJournal.js

 ## Attention! ##
 If you think that any plugin is not compatible with localization, let me know.

 ###===========================================================================
 ## Used formats
 ###===========================================================================
 The following formats can be used for translations:
 1. JSON (details: https://en.wikipedia.org/wiki/JSON)

 ###===========================================================================
 ## Instructions
 ###===========================================================================

 ### 1 ### Installation ###
 1. Add at least one language in the "Game languages" parameter.
 2. If you changed the standard font in the game, you also need to change it in the "Standard Font" parameter.

 ## Incomplete list of recommended locales ##
 Russian - ru
 Ukrainian - uk
 Belarusian - be
 English - en
 Chinese - zh
 Japanese - ja
 Korean - ko
 French - fe
 German - de
 Spanish - es
 Czech - cs
 Italian - it

 If you did not find a locale in this list, you can find it on the Internet, for example,
 here: https://www.science.co.il/language/Locale-codes.php

 ### 2 ### Usage ###
 1. When you first start the game, the plugin will create a folders for translations and json files for each language.
 2. To localize text use the tags: {}.
 3. To use a variable inside text use the tag: \VAR[ID],
 where ID is the number of the variable. Use only for depth of translation (see below).

 ### Adding a new translation with an example of an event with a message ###
 1. Create a new event, add a message display.
 2. In the message, write {text}. Save the event and project.
 3. Open json files for each language.
 4. The first character of the file must be {, and the last one - }.
 These characters can not be deleted. Inside these brackets the translation of the game is written.
 6. Add the following text to one of the files and save it: "text": "Text".
 7. Start the game and the created event.

 ### Attention! ###
 The encoding in the translation files must be UTF-8 without BOM.
 I recommend using Notepad++ to edit localization files.

 ###===========================================================================
 ## Using arrays
 ###===========================================================================
 Arrays are loaded into the localization data by file name.

 ### Using arrays with the "quests.json" file as an example ###
 1. The file has the following structure:
 [null, { "name": "Quest 1" }, { "name": "Quest 2" }]
 2. To display the text "Quest 1" in a message, you need to write a tag
 {quests[1].name}
 To access the array, you must first write the file name,
 in which it is stored, then it must be indicated in square brackets
 the element number and the field to be used.

 ###===========================================================================
 ## Localized resources
 ## Using different files (audio, images and videos) for each language
 ###===========================================================================
 This function will help to use special files for different languages.
 For example, if there is text on pictures, then you can make different pictures for each language,
 and the plugin itself will select the desired picture.
 This function works only with audio, video and images.

 ## Attention! ##
 For this function to work on mobile devices and browsers,
 you must set the Nwjs + Stamp file system mode in the DKTools plugin!

 1. Create a new folder in your images folder
 2. Use the required game locale as the folder name
 3. Move the files to the created folder
 Example:
 It is necessary to use different images from the "img/pictures" folder for different languages.
 Leave the image for the main (for example, English) language in the "img/pictures" folder.
 Create an "ru" folder under "img/pictures" and move the image for Russian language there.
 For example, for the English language, the main file from "img/pictures" will be used,
 and for Russian from the folder "img/pictures/ru" we created.

 ## Attention! ##
 Before publishing a game for browsers or mobile devices,
 run the DKTools plugin command UpdateFileSystemStamp to update
 file system stamp (more details in the DKTools plugin help)!

 ###===========================================================================
 ## Using an unlimited number of translation files
 ###===========================================================================
 ## Attention! ##
 For this function to work on mobile devices and browsers,
 you must set the Nwjs + Stamp file system mode in the DKTools plugin!
 This instruction is intended for the folder that has a default name (locales)
 If you renamed the folder in the plugin settings, then use the new folder name!

 If you have a large amount of text in the game, and you are not comfortable using one json file,
 then you can split it into several json files and put it in a separate folder.
 Example for English locale (en):
 1. In the locales folder, create an "en" folder.
 2. Transfer your old en.json file from the locales folder to the new folder.
 3. Create several json files with any names.
 4. In each file, write down the required tags and save the changes.
 ## Attention! ##
 All tags in all files must have a unique name!
 If the tag names match, the first one will be loaded (order is not guaranteed)!

 ### 3 ### Plugin parameters ###
 1. Ignored files - Files that are ignored by the UpdateLocalizationTags and ExportAllText plugin commands.
 2. Parse Depth - The number of text translation operations.
 In the translated text you can specify another tag,
 and it will be translated if the depth of translation is greater than 1.
 Example:
 "text": "Text {text2}",
 "text2" "2"
 With a translation depth of more than 1, the result is "Text 2".
 3. Text Length - The length of the text at which it is saved in the cache.
 This is necessary to reduce the computational resources for translation.
 The cache is automatically cleared when between maps.

 ### 4 ### Message special symbols ###
 1. \language - Display the name of the current language

 ### 5 ### Plugin commands ###
 1. Extracts untranslated tags: UpdateLocalizationTags
 The plugin command checks json files from "data/"
 except ignored files specified in the plugin parameters
 and also all the parameters of all plugins.
 Found tags that are missing in the localization folder,
 saved to a new files in the localization folder with the prefix "new".

 2. Clear the localization cache: ClearLocalizationCache

 3. Export all text: ExportAllText IGNORE_TAGS
 IGNORE_TAGS - Ignore localization tags ? true/false
 The plugin command checks json files from "data/"
 except ignored files specified in the plugin parameters
 and also all the parameters of all plugins.
 The found text are saved to the export.txt file in the localization folder.
 Unlike the UpdateLocalizationTags command, it stores all text, not just tags.

 ### 6 ### Script calls ###
 1. DKTools.Localization.locale - Get current locale
 2. DKTools.Localization.locales - Get an array of locales
 3. DKTools.Localization.language - Get current language
 4. DKTools.Localization.languages - Get an array of languages
 5. DKTools.Localization.getText(text) - Get localized text
 6. DKTools.Localization.getPrevLocale() - Get previous locale
 7. DKTools.Localization.getNextLocale() - Get next locale
 8. DKTools.Localization.getPrevLanguage() - Get previous language
 9. DKTools.Localization.getNextLanguage() - Get next language
 10. DKTools.Localization.selectLocale(locale) - Set locale (async, returns Promise)
 11. DKTools.Localization.selectPrevLocale() - Select previous locale (async, returns Promise)
 12. DKTools.Localization.selectNextLocale() - Select next locale (async, returns Promise)
 13. DKTools.Localization.addChangeLocaleListener(function) - Add "change locale listener" (sync/async function)
 14. DKTools.Localization.getPrimaryLocale() - Get primary locale
 15. DKTools.Localization.getPrimaryLanguage() - Get primary language

 ### 7 ### How to add the option to YEP_OptionsCore.js ###
 1. Place YEP_OptionsCore plugin ABOVE in the plugin list
 2. Enable "Show Options Command" parameter in the Localization plugin
 3. Configure the new option in YEP_OptionsCore.js with following parameters:
 Symbol: locale
 Show/Hide:
 show = LocalizationParam.get('Show Options Command');
 Draw Option Code:
 var rect = this.itemRectForText(index);
 var statusWidth = this.statusWidth();
 var titleWidth = rect.width - statusWidth;
 this.resetTextColor();
 this.changePaintOpacity(this.isCommandEnabled(index));
 this.drawOptionsName(index);
 this.drawText(this.statusText(index), titleWidth, rect.y, statusWidth, 'center');

 ### 8 ### Run on mobile devices and browsers ###
 1. Make sure you have Nwjs + Stamp filesystem mode enabled in the DKTools plugin.
 2. Before compiling the project, you must run the plugin command UpdateFileSystemStamp
 from the DKTools plugin.
 3. Compile the project for the required platform.
 A description of the filesystem modes can be found in the DKTools plugin help.

 ###===========================================================================
 ## License and terms of use
 ###===========================================================================
 You can:
 -To use the plugin for your non-commercial projects
 -Change code of the plugin

 You cannot:
 -Delete or change any information about the plugin
 -Distribute the plugin and its modifications

 ## Commercial license ##
 Visit the page: https://dk-plugins.ru/commercial-license/

 ###===========================================================================
 ## Support
 ###===========================================================================
 Donate: https://dk-plugins.ru/donate
 Become a patron: https://www.patreon.com/dkplugins

 * @param Localization
 * @default ---------------------------------

 * @param Languages
 * @text Game languages
 * @parent Localization
 * @desc List of game languages
 * @type struct<Language>[]
 * @default ["{\"Language\":\"English\",\"Locale\":\"en\",\"Primary\":\"true\"}"]

 * @param Locale File
 * @text Path to save the language of the game
 * @parent Localization
 * @desc Path to save the language of the game
 * @default save/locale.rpgsave

 * @param Localization Folder
 * @text Path to the localization folder
 * @parent Localization
 * @desc Path to the localization folder
 * @default locales/

 * @param Standard Font
 * @desc Standard font (with extension) from "fonts/" folder
 * @type combo
 * @option mplus-1m-regular.ttf
 * @default mplus-1m-regular.ttf

 * @param Fonts
 * @desc Fonts for each language
 * @type struct<Font>[]
 * @default []

 * @param First Launch
 * @parent Localization
 * @desc Show language choices the first time you start the game ?
 * @type boolean
 * @default false

 * @param First Launch Cursor
 * @parent First Launch
 * @desc Selected language (cursor or flag) at first time selection
 * @type select
 * @option Auto (based on system language) (experimentally)
 * @value auto
 * @option Primary language from the list of languages
 * @value primary
 * @default auto

 * @param Parse Depth
 * @desc Parse depth. See the plugin help for details.
 * @type number
 * @min 1
 * @max 5
 * @default 2

 * @param Cache
 * @parent Localization
 * @default ---------------------------------

 * @param Text Length
 * @parent Cache
 * @desc The minimum length of text to save to the cache. See the plugin help for details.
 * @type number
 * @min 8
 * @default 20

 * @param Update Localization Tags
 * @default ---------------------------------

 * @param Ignored Files
 * @parent Update Localization Tags
 * @desc Ignored files from "data/". See the plugin help for details.
 * @type string[]
 * @default ["Animations","MapInfos","Tilesets","Stamp"]

 * @param Title Menu
 * @default ---------------------------------

 * @param Show Command
 * @parent Title Menu
 * @desc Show the command in the title menu ?
 * @type boolean
 * @default true

 * @param Command Name
 * @parent Title Menu
 * @desc Command name
 * @default {interface_language}

 * @param Button
 * @parent Title Menu
 * @text Button on the title screen
 * @default ---------------------------------

 * @param Show Button
 * @parent Button
 * @desc Show the button in the title menu ?
 * @type boolean
 * @default false

 * @param Button Graphic
 * @parent Button
 * @desc Button graphic from img/system. Use %1 to replace by locale.
 * @default locale_%1

 * @param Button X
 * @parent Button
 * @desc The X coordinate of button center
 * @type number
 * @min 0
 * @default 0

 * @param Button Y
 * @parent Button
 * @desc The Y coordinate of button center
 * @type number
 * @min 0
 * @default 0

 * @param Options
 * @default ---------------------------------

 * @param Show Options Command
 * @parent Options
 * @desc Show the command in the options ?
 * @type boolean
 * @default false

 * @param Options Command Name
 * @parent Options
 * @desc Command name
 * @default {interface_language}

 * @param Scene Localization
 * @text Appearance
 * @default ---------------------------------

 * @param Background Filename
 * @text Background
 * @parent Scene Localization
 * @desc Background
 * @type file
 * @dir img/system/

 * @param Foreground Filename
 * @text Foreground
 * @parent Scene Localization
 * @desc Foreground
 * @type file
 * @dir img/system/

 * @param Help Text
 * @parent Scene Localization
 * @desc Help text for each language
 * @type struct<HelpText>[]
 * @default ["{\"Locale\":\"en\",\"Text\":\"Select language\"}"]

 * @param BGM
 * @parent Scene Localization
 * @desc BGM
 * @type struct<BGM>
 * @default {"BGM":"","Volume":"90","Pan":"0","Pitch":"100"}

 * @param Flag Filename
 * @parent Scene Localization
 * @desc Flag filename from img/system. Use %1 to replace by locale.
 * @default flag_%1

 * @param Font Size
 * @parent Scene Localization
 * @desc Font size
 * @type number
 * @min 1
 * @default 28

 * @param Style
 * @parent Scene Localization
 * @desc Style
 * @type select
 * @option Window
 * @option Flags
 * @default Window

 * @param Style Window
 * @parent Scene Localization
 * @desc Settings for style Window
 * @type struct<StyleWindow>
 * @default {"Window Width":"400","Window Rows":"2","Row Height":"48","Help Window":"{\"Show\":\"true\",\"Show Frame\":\"true\",\"Background Opacity\":\"192\",\"Y\":\"\\\"Graphics.boxHeight / 4;\\\"\",\"Width\":\"400\"}"}

 * @param Style Flags
 * @parent Scene Localization
 * @desc Settings for style Flags
 * @type struct<StyleFlags>
 * @default {"Mouse Scroll":"true","Loop Scroll":"true","Side Flags":"{\"Left Flag X\":\"\\\"Graphics.boxWidth / 3 - (Graphics.boxWidth / 3 - left.width * left.anchor.x) / 2;\\\"\",\"Right Flag X\":\"\\\"Graphics.boxWidth * 2 / 3 + (Graphics.boxWidth / 3 - right.width * right.anchor.x) / 2;\\\"\",\"Opacity\":\"128\",\"Scale\":\"0.65\"}","Flag Animation":"{\"Enabled\":\"true\",\"Duration\":\"60\",\"Min Scale\":\"0.95\",\"Max Scale\":\"1.05\"}","Help Window":"{\"Show\":\"true\",\"Show Frame\":\"true\",\"Background Opacity\":\"192\",\"Y\":\"\\\"Graphics.boxHeight / 4;\\\"\",\"Width\":\"400\"}","Language Window":"{\"Show\":\"true\",\"Show Frame\":\"true\",\"Background Opacity\":\"192\",\"Y\":\"\\\"Graphics.boxHeight * 3 / 4 - 72;\\\"\",\"Width\":\"400\"}","Play Cursor Sound":"true","Play Ok Sound":"true","Play Cancel Sound":"true"}

*/

/*:ru
 * @plugindesc v.5.3.1 [MV] Локализация игры.
 * @author DKPlugins
 * @url https://dk-plugins.ru
 * @target MV
 * @base DKTools
 * @orderAfter DKTools
 * @help

 ### Информация о плагине ###
 Название: DKTools_Localization
 Автор: DKPlugins
 Сайт: https://dk-plugins.ru
 Версия: 5.3.1
 Релиз: 30.03.2021
 Первый релиз: 28.08.2016

 ###===========================================================================
 ## Требования и зависимости
 ###===========================================================================
 Наличие включенного плагина DKTools версии 10.0.4 или выше

 ###===========================================================================
 ## Известные проблемы
 ###===========================================================================
 1. Не работают специальные символы сообщений для изменения размеры шрифта \{ и \}
 Решение: используйте добавленные специальные символы
 \MFS - Уменьшить шрифт (аналог \})
 \MFB - Увеличить шрифт (аналог \{)

 ###===========================================================================
 ## Демоверсия
 ###===========================================================================
 https://dk-plugins.ru/mv/system/localization/

 ###===========================================================================
 ## MZ версия
 ###===========================================================================
 https://dk-plugins.ru/mz/system/localization/

 ###===========================================================================
 ## Специальная совместимость с другими плагинами
 ###===========================================================================
 Плагин совместим с большинством других плагинов, но все же могут попасться плагины,
 которые не работают с локализацией. Я добавляю совместимость этих плагинов.
 Чтобы совместимость работала правильно,
 плагины из следующего списка необходимо разместить ВЫШЕ плагина локализации:
 YEP_MessageCore.js
 YEP_OptionsCore.js
 YEP_QuestJournal.js

 ## Внимание! ##
 Если вы считаете, что какой-то плагин несовместим с локализацией сообщите мне об этом.

 ###===========================================================================
 ## Используемые форматы
 ###===========================================================================
 Для переводов могут использоваться следующие форматы:
 1. JSON (подробнее: https://ru.wikipedia.org/wiki/JSON)

 ###===========================================================================
 ## Инструкции
 ###===========================================================================

 ### 1 ### Установка ###
 1. Добавить хотя бы один язык в параметре "Языки игры".
 2. Если вы меняли стандартный шрифт в игре, то его также нужно изменить в параметре "Стандартный шрифт".

 ## Неполный список рекомендованных локалей ##
 Russian - ru
 Ukrainian - uk
 Belarusian - be
 English - en
 Chinese - zh
 Japanese - ja
 Korean - ko
 French - fe
 German - de
 Spanish - es
 Czech - cs
 Italian - it

 Если вы не нашли в этом списке локаль, то можете найти ее в интернете, например,
 здесь: https://www.science.co.il/language/Locale-codes.php

 ### 2 ### Использование ###
 1. При первом запуске игры плагин создаст папки для переводов и json файлы для каждого языка.
 2. Для локализации текста используйте теги: {}.
 3. Для использования переменной внутри текста используйте тег \VAR[ID],
 где ID - номер переменной. Используйте только для глубины перевода (см. ниже).

 ### Добавление нового перевода на примере события с сообщением ###
 1. Создайте новое событие, добавьте отображение сообщения.
 2. В сообщении напишите {text}. Сохраните событие и проект.
 3. Откройте json файлы для каждого языка.
 4. Первый символ файла должна быть {, а последний - }.
 Эти символы нельзя удалять. Внутри этих скобок пишется перевод игры.
 6. Добавьте в один из файлов следующий текст и сохраните его: "text": "Текст".
 7. Запустите игру и созданное событие.

 ### Внимание! ###
 Кодировка в файлах перевода должна быть UTF-8 без BOM.
 Рекомендую использовать Notepad++ для редактирования файлов локализации.

 ###===========================================================================
 ## Использование массивов
 ###===========================================================================
 Массивы загружаются в данные локализации по названию файла.

 ## Использование массивов на примере файла "quests.json" ##
 1. Файл имеет следующую структуру:
 [null, { "name": "Quest 1" }, { "name": "Quest 2" }]
 2. Чтобы вывести в сообщении текст "Quest 1", необходимо прописать тег
 {quests[1].name}
 Чтобы обратиться к массиву сначала необходимо написать название файла,
 в котором он хранится, затем необходимо указать в квадратных скобках
 номер элемента и поле, которое должно быть использовано.

 ###===========================================================================
 ## Локализованные ресурсы
 ## Использование разных файлов (аудио, изображения, видео) для каждого языка
 ###===========================================================================
 Данная функция поможет использовать специальные файлы для разных языков.
 Например, если на них есть текст, то можно сделать разные изображения для каждого языка,
 и плагин сам будет выбирать нужное изображение.
 Данная функция работает только с аудио, видео и изображениями.

 ## Внимание! ##
 Для работы данной функции на мобильных устройствах и в браузерах
 необходимо выставить режим работы файловой системы Nwjs + Stamp в плагине DKTools!

 1. Создайте новую папку в папке с изображениями
 2. В качестве имени папки используйте необходимую локаль игры
 3. Переместите файлы в созданную папку
 Пример:
 Необходимо использовать разные изображения из папки "img/pictures" для разных языков.
 Изображение для основного (например, русского) языка оставьте в папке "img/pictures".
 Создайте папку "en" в "img/pictures" и переместите туда изображение для английского языка.
 Например, для русского языка будет использоваться основной файл из "img/pictures",
 а для английского языка из созданной нами папки "img/pictures/en".

 ## Внимание! ##
 Перед тем как публиковать игру для браузеров или мобильных устройств,
 выполните команду плагина DKTools UpdateFileSystemStamp для обновления
 штампа файловой системы (подробнее в справке плагина DKTools)!

 ###===========================================================================
 ## Использование неограниченного количества файлов перевода
 ###===========================================================================
 ## Внимание! ##
 Для работы данной функции на мобильных устройствах и в браузерах
 необходимо выставить режим работы файловой системы Nwjs + Stamp в плагине DKTools!
 Данная инструкция предназначена для папки, которая имеет название по умолчанию (locales)
 Если Вы переименовали папку в параметрах плагина, то используйте новое название папки!

 Если у Вас большое количество текста в игре, и Вам неудобно пользоваться одним json файлом,
 то Вы можете разбить его на несколько json файлов и поместить в отдельную папку.
 Пример для английской локали (en):
 1. В папке locales создайте папку en.
 2. Перенесите в новую папку свой старый файл en.json из папки locales.
 3. Создайте несколько json файлов с любыми именами.
 4. В каждом файле пропишите необходимые теги и сохраните изменения.
 ## Внимание! ##
 Все теги во всех файлах должны иметь уникальное название!
 В случае совпадения имен тегов будет загружен первый из них (порядок не гарантируется)!

 ### 3 ### Параметры плагина ###
 1. Игнорируемые файлы - Файлы, которые игнорируются командами плагина UpdateLocalizationTags и ExportAllText.
 2. Глубина перевода - Количество операций перевода текста.
 В переведенном тексте Вы можете указать другой тег,
 и он будет переведен, если глубина перевода больше 1.
 Пример:
 "text": "Текст {text2}",
 "text2" "2"
 При глубине перевода больше 1 в итоге получится "Текст 2".
 3. Длина текста - Длина текста, при которой он сохраняется в кэш.
 Это нужно, чтобы сократить необходимые вычислительные ресурсы для перевода.
 Кэш автоматически очищается при переходе между картами.

 ### 4 ### Специальные символы сообщений ###
 1. \language - Вывести название текущего языка

 ### 5 ### Команды плагина ###
 1. Извлечь непереведенные теги: UpdateLocalizationTags
 Команда плагина проверяет json файлы из папки "data/" (кроме игнорируемых файлов,
 заданных в параметрах плагина), а также все параметры всех плагинов.
 Найденные теги, которые отсутствуют в папке локализации,
 сохраняются в новые файлы в папке локализации с префиксом "new".

 2. Очистить кэш локализации: ClearLocalizationCache

 3. Извлечь весь текст: ExportAllText IGNORE_TAGS
 IGNORE_TAGS - Игнорировать теги локализации ? true/false
 Команда плагина проверяет json файлы из папки "data/" (кроме игнорируемых файлов,
 заданных в параметрах плагина), а также все параметры всех плагинов.
 Найденный текст сохраняется в файл export.txt в папке локализации.
 В отличии от команды UpdateLocalizationTags сохраняет весь текст, а не только теги.

 ### 6 ### Вызовы скриптов ###
 1. DKTools.Localization.locale - Получить текущую локаль
 2. DKTools.Localization.locales - Получить массив локалей
 3. DKTools.Localization.language - Получить текущий язык
 4. DKTools.Localization.languages - Получить массив языков
 5. DKTools.Localization.getText(text) - Получить локализованный текст
 6. DKTools.Localization.getPrevLocale() - Получить предыдущую локаль
 7. DKTools.Localization.getNextLocale() - Получить следующую локаль
 8. DKTools.Localization.getPrevLanguage() - Получить предыдущий язык
 9. DKTools.Localization.getNextLanguage() - Получить следующий язык
 10. DKTools.Localization.selectLocale(locale) - Установить локаль (асинхронная операция, возвращает Promise)
 11. DKTools.Localization.selectPrevLocale() - Выбрать предыдущую локаль (асинхронная операция, возвращает Promise)
 12. DKTools.Localization.selectNextLocale() - Выбрать следующую локаль (асинхронная операция, возвращает Promise)
 13. DKTools.Localization.addChangeLocaleListener(function) - Добавить слушателя изменения локали (синхронная/асинхронная функция)
 14. DKTools.Localization.getPrimaryLocale() - Получить основную локаль
 15. DKTools.Localization.getPrimaryLanguage() - Получить основной язык

 ### 7 ### Как добавить опцию в YEP_OptionsCore.js ###
 1. Поместите плагин YEP_OptionsCore ВЫШЕ в списке плагинов
 2. Включите параметр "Показывать команду" в плагине локализации
 3. Добавьте новую опцию в YEP_OptionsCore.js со следующими параметрами:
 Symbol: locale
 Show/Hide:
 show = LocalizationParam.get('Show Options Command');
 Draw Option Code:
 var rect = this.itemRectForText(index);
 var statusWidth = this.statusWidth();
 var titleWidth = rect.width - statusWidth;
 this.resetTextColor();
 this.changePaintOpacity(this.isCommandEnabled(index));
 this.drawOptionsName(index);
 this.drawText(this.statusText(index), titleWidth, rect.y, statusWidth, 'center');

 ### 8 ### Запуск на мобильных устройствах и браузерах ###
 1. Убедитесь, что у вас включен режим файловой системы Nwjs + Stamp в плагине DKTools.
 2. Перед компиляцией проекта необходимо выполнить команду плагина UpdateFileSystemStamp
 из плагина DKTools.
 3. Скомпилируйте проект под нужную платформу.
 Описание режимов файловой системы можно найти в справке по плагину DKTools.

 ###===========================================================================
 ## Лицензия и правила использования плагина
 ###===========================================================================
 Вы можете:
 -Использовать плагин в некоммерческих проектах
 -Изменять код плагина

 Вы не можете:
 -Удалять или изменять любую информацию о плагине
 -Распространять плагин и его модификации

 ## Коммерческая лицензия ##
 Посетите страницу: https://dk-plugins.ru/commercial-license/

 ###===========================================================================
 ## Поддержка
 ###===========================================================================
 Поддержать: https://dk-plugins.ru/donate
 Стать патроном: https://www.patreon.com/dkplugins

 * @param Localization
 * @text Локализация
 * @default ---------------------------------

 * @param Languages
 * @text Языки игры
 * @parent Localization
 * @desc Список языков игры
 * @type struct<Language>[]
 * @default ["{\"Language\":\"Русский\",\"Locale\":\"ru\",\"Primary\":\"true\"}"]

 * @param Locale File
 * @text Путь для сохранения языка игры
 * @parent Localization
 * @desc Путь для сохранения языка игры
 * @default save/locale.rpgsave

 * @param Localization Folder
 * @text Путь к папке с переводами
 * @parent Localization
 * @desc Путь к папке с переводами
 * @default locales/

 * @param Standard Font
 * @text Стандартный шрифт
 * @parent Localization
 * @desc Стандартный шрифт (с расширением) из папки "fonts/"
 * @type combo
 * @option mplus-1m-regular.ttf
 * @default mplus-1m-regular.ttf

 * @param Fonts
 * @text Шрифты
 * @parent Localization
 * @desc Шрифты для каждого языка
 * @type struct<Font>[]
 * @default []

 * @param First Launch
 * @parent Localization
 * @text Первый запуск
 * @desc Показывать выбор языка при первом запуске игры ?
 * @type boolean
 * @default false

 * @param First Launch Cursor
 * @text Курсор при первом запуске
 * @parent First Launch
 * @desc Выбранный язык (курсор или флаг) при первом выборе
 * @type select
 * @option Авто (основано на системном языке) (экспериментально)
 * @value auto
 * @option Основной язык из списка языков
 * @value primary
 * @default auto

 * @param Parse Depth
 * @text Глубина перевода
 * @parent Localization
 * @desc Глубина перевода. Подробнее в справке плагина.
 * @type number
 * @min 1
 * @max 5
 * @default 2

 * @param Cache
 * @text Кэш
 * @parent Localization
 * @default ---------------------------------

 * @param Text Length
 * @parent Cache
 * @text Длина текста
 * @desc Минимальная длина текста для сохранения в кэш. Подробнее в справке плагина.
 * @type number
 * @min 8
 * @default 20

 * @param Update Localization Tags
 * @text Обновление тегов локализации
 * @default ---------------------------------

 * @param Ignored Files
 * @text Игнорируемые файлы
 * @parent Update Localization Tags
 * @desc Игнорируемые файлы из папки "data/". Подробнее в справке плагина.
 * @type string[]
 * @default ["Animations","MapInfos","Tilesets","Stamp"]

 * @param Title Menu
 * @text Титульное меню
 * @default ---------------------------------

 * @param Show Command
 * @parent Title Menu
 * @text Показывать команду
 * @desc Показывать команду в титульном меню ?
 * @type boolean
 * @default true

 * @param Command Name
 * @text Название команды
 * @parent Title Menu
 * @desc Название команды
 * @default {interface_language}

 * @param Button
 * @parent Title Menu
 * @text Кнопка на титульном экране
 * @default ---------------------------------

 * @param Show Button
 * @text Показывать кнопку
 * @parent Button
 * @desc Показывать кнопку на титульном экране ?
 * @type boolean
 * @default false

 * @param Button Graphic
 * @text Графика кнопки
 * @parent Button
 * @desc Графика кнопки из папки img/system. Используйте %1, чтобы заменить на локаль игры.
 * @default locale_%1

 * @param Button X
 * @text Координата X
 * @parent Button
 * @desc Координата X центра кнопки
 * @type number
 * @min 0
 * @default 0

 * @param Button Y
 * @text Координата Y
 * @parent Button
 * @desc Координата Y центра кнопки
 * @type number
 * @min 0
 * @default 0

 * @param Options
 * @text Опции
 * @default ---------------------------------

 * @param Show Options Command
 * @parent Options
 * @text Показывать команду
 * @desc Показывать команду в опциях ?
 * @type boolean
 * @default false

 * @param Options Command Name
 * @text Название команды
 * @parent Options
 * @desc Название команды
 * @default {interface_language}

 * @param Scene Localization
 * @text Внешний вид
 * @default ---------------------------------

 * @param Background Filename
 * @text Задний фон
 * @parent Scene Localization
 * @desc Задний фон
 * @type file
 * @dir img/system/

 * @param Foreground Filename
 * @text Передний фон
 * @parent Scene Localization
 * @desc Передний фон
 * @type file
 * @dir img/system/

 * @param Help Text
 * @text Текст подсказки
 * @parent Scene Localization
 * @desc Текст подсказки для каждого языка
 * @type struct<HelpText>[]
 * @default ["{\"Locale\":\"ru\",\"Text\":\"Выберите язык\"}"]

 * @param BGM
 * @parent Scene Localization
 * @desc BGM
 * @type struct<BGM>
 * @default {"BGM":"","Volume":"90","Pan":"0","Pitch":"100"}

 * @param Flag Filename
 * @parent Scene Localization
 * @text Графика флага
 * @desc Графика флага из папки img/system. Используйте %1, чтобы заменить на локаль игры
 * @default flag_%1

 * @param Font Size
 * @parent Scene Localization
 * @text Размер шрифта
 * @desc Размер шрифта
 * @type number
 * @min 1
 * @default 28

 * @param Style
 * @text Стиль
 * @parent Scene Localization
 * @desc Style
 * @type select
 * @option Окно
 * @value Window
 * @option Флаги
 * @value Flags
 * @default Window

 * @param Style Window
 * @text Стиль Окно
 * @parent Scene Localization
 * @desc Settings for style Window
 * @type struct<StyleWindow>
 * @default {"Window Width":"400","Window Rows":"2","Row Height":"48","Help Window":"{\"Show\":\"true\",\"Show Frame\":\"true\",\"Background Opacity\":\"192\",\"Y\":\"\\\"Graphics.boxHeight / 4;\\\"\",\"Width\":\"400\"}"}

 * @param Style Flags
 * @text Стиль Флаги
 * @parent Scene Localization
 * @desc Settings for style Flags
 * @type struct<StyleFlags>
 * @default {"Mouse Scroll":"true","Loop Scroll":"true","Side Flags":"{\"Left Flag X\":\"\\\"Graphics.boxWidth / 3 - (Graphics.boxWidth / 3 - left.width * left.anchor.x) / 2;\\\"\",\"Right Flag X\":\"\\\"Graphics.boxWidth * 2 / 3 + (Graphics.boxWidth / 3 - right.width * right.anchor.x) / 2;\\\"\",\"Opacity\":\"128\",\"Scale\":\"0.65\"}","Flag Animation":"{\"Enabled\":\"true\",\"Duration\":\"60\",\"Min Scale\":\"0.95\",\"Max Scale\":\"1.05\"}","Help Window":"{\"Show\":\"true\",\"Show Frame\":\"true\",\"Background Opacity\":\"192\",\"Y\":\"\\\"Graphics.boxHeight / 4;\\\"\",\"Width\":\"400\"}","Language Window":"{\"Show\":\"true\",\"Show Frame\":\"true\",\"Background Opacity\":\"192\",\"Y\":\"\\\"Graphics.boxHeight * 3 / 4 - 72;\\\"\",\"Width\":\"400\"}","Play Cursor Sound":"true","Play Ok Sound":"true","Play Cancel Sound":"true"}

*/

/*~struct~Language:

 * @param Language
 * @text Language name
 * @desc Language name
 * @type combo
 * @option English
 * @option Русский
 * @default English

 * @param Locale
 * @text Short language name
 * @desc Short language name (locale/language code)
 * @type combo
 * @option en
 * @option ru
 * @default en

 * @param Primary
 * @text Primary language
 * @desc Is this the primary language of the game ?
 * @type boolean
 * @default false

*/

/*~struct~Language:ru

 * @param Language
 * @text Название языка
 * @desc Название языка
 * @type combo
 * @option Русский
 * @option English
 * @default Русский

 * @param Locale
 * @text Короткое название языка
 * @desc Короткое название языка (локаль/код языка)
 * @type combo
 * @option ru
 * @option en
 * @default ru

 * @param Primary
 * @text Основной язык
 * @desc Это основной язык игры ?
 * @type boolean
 * @default false

*/

/*~struct~HelpText:

 * @param Locale
 * @desc Game locale
 * @type combo
 * @option en
 * @option ru
 * @default en

 * @param Text
 * @desc Help text
 * @type combo
 * @option Select language
 * @option Выберите язык
 * @default Select language

*/

/*~struct~HelpText:ru

 * @param Locale
 * @text Локаль игры
 * @desc Локаль игры
 * @type combo
 * @option ru
 * @option en
 * @default ru

 * @param Text
 * @text Текст
 * @desc Текст подсказки
 * @type combo
 * @option Выберите язык
 * @option Select language
 * @default Выберите язык

*/

/*~struct~Font:

 * @param Locale
 * @desc Game locale
 * @type combo
 * @option en
 * @option ru
 * @default en

 * @param Font
 * @desc Font (with file extension). For example, my_amazing_font.ttf
 * @type combo
 * @option mplus-1m-regular.ttf
 * @default mplus-1m-regular.ttf

*/

/*~struct~Font:ru

 * @param Locale
 * @text Локаль игры
 * @desc Локаль игры
 * @type combo
 * @option ru
 * @option en
 * @default ru

 * @param Font
 * @text Шрифт
 * @desc Шрифт (с расширением файла). Например, my_amazing_font.ttf
 * @type combo
 * @option mplus-1m-regular.ttf
 * @default mplus-1m-regular.ttf

*/

/*~struct~BGM:

 * @param BGM
 * @desc BGM filename
 * @type file
 * @dir audio/bgm

 * @param Volume
 * @desc Volume
 * @type number
 * @min 1
 * @max 100
 * @default 90

 * @param Pan
 * @desc Panorama
 * @type number
 * @min -100
 * @max 100
 * @default 0

 * @param Pitch
 * @desc Pitch
 * @type number
 * @min 50
 * @max 150
 * @default 100

*/

/*~struct~BGM:ru

 * @param BGM
 * @desc BGM файл
 * @type file
 * @dir audio/bgm

 * @param Volume
 * @text Громкость
 * @desc Громкость
 * @type number
 * @min 1
 * @max 100
 * @default 90

 * @param Pan
 * @text Панорама
 * @desc Панорама
 * @type number
 * @min -100
 * @max 100
 * @default 0

 * @param Pitch
 * @text Темп
 * @desc Темп
 * @type number
 * @min 50
 * @max 150
 * @default 100

*/

/*~struct~StyleWindow:

 * @param Window Width
 * @desc Window width
 * @type number
 * @min 1
 * @default 400

 * @param Window Rows
 * @text Number of visible rows
 * @desc Number of visible rows
 * @type number
 * @min 2
 * @default 2

 * @param Row Height
 * @desc Row height in pixels
 * @type number
 * @min 16
 * @default 48

 * @param Help Window
 * @desc Help window
 * @type struct<Window>
 * @default {"Show":"true","Show Frame":"true","Background Opacity":"192","Y":"\"Graphics.boxHeight / 4;\"","Width":"400"}

*/

/*~struct~StyleWindow:ru

 * @param Window Width
 * @text Ширина окна
 * @desc Ширина окна
 * @type number
 * @min 1
 * @default 400

 * @param Window Rows
 * @text Видимые строки
 * @desc Количество видимых строк
 * @type number
 * @min 2
 * @default 2

 * @param Row Height
 * @text Высота строки
 * @desc Высота строки
 * @type number
 * @min 16
 * @default 48

 * @param Help Window
 * @text Окно помощи
 * @desc Окно помощи
 * @type struct<Window>
 * @default {"Show":"true","Show Frame":"true","Background Opacity":"192","Y":"\"Graphics.boxHeight / 4;\"","Width":"400"}

*/

/*~struct~StyleFlags:

 * @param Mouse Scroll
 * @desc Scrolling the list with the mouse wheel ?
 * @type boolean
 * @default true

 * @param Loop Scroll
 * @desc Loop scrolling of flags
 * @type boolean
 * @default true

 * @param Side Flags
 * @desc Side flags
 * @type struct<SideFlags>
 * @default {"Left Flag X":"\"Graphics.boxWidth / 3 - (Graphics.boxWidth / 3 - left.width * left.anchor.x) / 2;\"","Right Flag X":"\"Graphics.boxWidth * 2 / 3 + (Graphics.boxWidth / 3 - right.width * right.anchor.x) / 2;\"","Opacity":"128","Scale":"0.65"}

 * @param Flag Animation
 * @desc Flag animation
 * @type struct<FlagAnimation>
 * @default {"Enabled":"true","Duration":"60","Min Scale":"0.95","Max Scale":"1.05"}

 * @param Help Window
 * @desc Help window
 * @type struct<Window>
 * @default {"Show":"true","Show Frame":"true","Background Opacity":"192","Y":"\"Graphics.boxHeight / 4;\"","Width":"400"}

 * @param Language Window
 * @desc Language window
 * @type struct<Window>
 * @default {"Show":"true","Show Frame":"true","Background Opacity":"192","Y":"\"Graphics.boxHeight * 3 / 4 - 72;\"","Width":"400"}

 * @param Play Cursor Sound
 * @desc Play cursor sound
 * @type boolean
 * @default true

 * @param Play Ok Sound
 * @desc Play ok sound
 * @type boolean
 * @default true

 * @param Play Cancel Sound
 * @desc Play cancel sound
 * @type boolean
 * @default true

*/

/*~struct~StyleFlags:ru

 * @param Mouse Scroll
 * @parent Scene Localization
 * @text Прокрутка мышкой
 * @desc Прокручивать список колесом мыши ?
 * @type boolean
 * @default true

 * @param Loop Scroll
 * @text Циклическая прокрутка
 * @desc Циклическая прокрутка флагов
 * @type boolean
 * @default true

 * @param Side Flags
 * @text Боковые флаги
 * @desc Боковые флаги
 * @type struct<SideFlags>
 * @default {"Left Flag X":"\"Graphics.boxWidth / 3 - (Graphics.boxWidth / 3 - left.width * left.anchor.x) / 2;\"","Right Flag X":"\"Graphics.boxWidth * 2 / 3 + (Graphics.boxWidth / 3 - right.width * right.anchor.x) / 2;\"","Opacity":"128","Scale":"0.65"}

 * @param Flag Animation
 * @text Анимация флага
 * @desc Анимация флага
 * @type struct<FlagAnimation>
 * @default {"Enabled":"true","Duration":"60","Min Scale":"0.95","Max Scale":"1.05"}

 * @param Help Window
 * @text Окно помощи
 * @desc Окно помощи
 * @type struct<Window>
 * @default {"Show":"true","Show Frame":"true","Background Opacity":"192","Y":"\"Graphics.boxHeight / 4;\"","Width":"400"}

 * @param Language Window
 * @text Окно названия языка
 * @desc Окно названия языка
 * @type struct<Window>
 * @default {"Show":"true","Show Frame":"true","Background Opacity":"192","Y":"\"Graphics.boxHeight * 3 / 4 - 72;\"","Width":"400"}

 * @param Play Cursor Sound
 * @text Проигрывание звука курсора
 * @desc Проигрывание звука курсора
 * @type boolean
 * @default true

 * @param Play Ok Sound
 * @text Проигрывание звука подтверждения
 * @desc Проигрывание звука подтверждения
 * @type boolean
 * @default true

 * @param Play Cancel Sound
 * @text Проигрывание звука отмены
 * @desc Проигрывание звука отмены
 * @type boolean
 * @default true

*/

/*~struct~FlagAnimation:

 * @param Enabled
 * @desc Enable flag animation ?
 * @type boolean
 * @default true

 * @param Duration
 * @desc Animation duration
 * @type number
 * @min 2
 * @default 60

 * @param Min Scale
 * @desc Minimum scaling of flag (X and Y)
 * @type number
 * @decimals 2
 * @min 0.05
 * @max 2.00
 * @default 0.95

 * @param Max Scale
 * @desc Maximum scaling of flag (X and Y)
 * @type number
 * @decimals 2
 * @min 0.05
 * @max 2.00
 * @default 1.05

*/

/*~struct~FlagAnimation:ru

 * @param Enabled
 * @text Включено
 * @desc Включить анимацию флага ?
 * @type boolean
 * @default true

 * @param Duration
 * @text Длительность
 * @desc Длительность анимации
 * @type number
 * @min 2
 * @default 60

 * @param Min Scale
 * @text Минимальное масштабирование флага
 * @desc Минимальное масштабирование флага (X и Y)
 * @type number
 * @decimals 2
 * @min 0.05
 * @max 2.00
 * @default 0.95

 * @param Max Scale
 * @text Максимальное масштабирование флага
 * @desc Максимальное масштабирование флага (X и Y)
 * @type number
 * @decimals 2
 * @min 0.05
 * @max 2.00
 * @default 1.05

*/

/*~struct~SideFlags:

 * @param Left Flag X
 * @desc The X coordinate of left flag. Calculated with Javascript.
 * @type note
 * @default "Graphics.boxWidth / 3 - (Graphics.boxWidth / 3 - left.width * left.anchor.x) / 2;"

 * @param Right Flag X
 * @desc The X coordinate of right flag. Calculated with Javascript.
 * @type note
 * @default "Graphics.boxWidth * 2 / 3 + (Graphics.boxWidth / 3 - right.width * right.anchor.x) / 2;"

 * @param Opacity
 * @desc Opacity
 * @type number
 * @min 1
 * @default 128

 * @param Scale
 * @desc Scaling (X and Y)
 * @type number
 * @decimals 2
 * @min 0.05
 * @max 2.00
 * @default 0.65

*/

/*~struct~SideFlags:ru

 * @param Left Flag X
 * @text Координата X левого флага
 * @desc Координата X левого флага. Вычисляется с помощью Javascript.
 * @type note
 * @default "Graphics.boxWidth / 3 - (Graphics.boxWidth / 3 - left.width * left.anchor.x) / 2;"

 * @param Right Flag X
 * @text Координата X правого флага
 * @desc Координата X правого флага. Вычисляется с помощью Javascript.
 * @type note
 * @default "Graphics.boxWidth * 2 / 3 + (Graphics.boxWidth / 3 - right.width * right.anchor.x) / 2;"

 * @param Opacity
 * @text Прозрачность
 * @desc Прозрачность
 * @type number
 * @min 1
 * @default 128

 * @param Scale
 * @text Масштабирование (X и Y)
 * @desc Масштабирование (X и Y)
 * @type number
 * @decimals 2
 * @min 0.05
 * @max 2.00
 * @default 0.65

*/

/*~struct~Window:

 * @param Show
 * @desc Show window ?
 * @type boolean
 * @default true

 * @param Show Frame
 * @desc Show window frame ?
 * @type boolean
 * @default true

 * @param Background Opacity
 * @desc Background opacity
 * @type number
 * @min 0
 * @max 255
 * @default 192

 * @param Y
 * @desc The Y coordinate of window. Calculated with Javascript.
 * @type note
 * @default "0"

 * @param Width
 * @desc Width of window. Calculated with Javascript.
 * @type note
 * @default "400"

*/

/*~struct~Window:ru

 * @param Show
 * @text Видимость окна
 * @desc Показывать окно ?
 * @type boolean
 * @default true

 * @param Show Frame
 * @text Видимость рамки окна
 * @desc Показывать рамку окна ?
 * @type boolean
 * @default true

 * @param Background Opacity
 * @text Прозрачность заднего фона
 * @desc Прозрачность заднего фона
 * @type number
 * @min 0
 * @max 255
 * @default 192

 * @param Y
 * @text Координата Y
 * @desc Координата Y окна. Вычисляется с помощью Javascript.
 * @type note
 * @default "0"

 * @param Width
 * @text Ширина окна
 * @desc Ширина окна. Вычисляется с помощью Javascript.
 * @type note
 * @default "400"

*/

'use strict';

var Imported = Imported || {};
Imported['DKTools_Localization'] = '5.3.1';

if (Imported['DKTools']) {
    DKTools.PluginManager.requirePlugin('DKTools', '10.0.4');
} else {
    throw new Error('No plugin "DKTools"! Plugin "DKTools_Localization" will not work!');
}

//===========================================================================
// initialize parameters
//===========================================================================

const LocalizationParam = new DKTools.ParameterManager('DKTools_Localization');

//===========================================================================
// initialize plugin commands
//===========================================================================

DKTools.PluginCommandManager.set('UpdateLocalizationTags', async () => {
    if (!Utils.isNwjs()) {
        return;
    }

    const directory = new DKTools.IO.Directory('data/');
    const result = await directory.getJsonFilesAsync();

    if (result.status !== DKTools.IO.OK) {
        DKTools.Utils.throwError(new Error('Cannot load json files from folder "data/"'));

        return;
    }

    if (result.data.length === 0) {
        DKTools.Utils.throwError(new Error('Folder "data/" does not contain json files'));

        return;
    }

    const ignoredFiles = LocalizationParam.get('Ignored Files');
    const files = _.filter(result.data,
            file => !ignoredFiles.includes(file.getName()));

    if (files.length === 0) {
        return;
    }

    const regex = DKTools.Localization.regexTag;
    const data = {};

    const processMatch = (regex, value) => {
        let result = regex.exec(value);

        while (result !== null) {
            const match = result[1];

            _.set(data, match, '');

            result = regex.exec(value);
        }
    };

    const parseObject = (object) => {
        if (!(object instanceof Object)) {
            return;
        }

        _.forEach(object, (value) => {
            if (DKTools.Utils.isString(value)) {
                processMatch(regex, value);
            } else {
                parseObject(value);
            }
        });
    };

    for (const file of files) {
        const fileData = await file.loadJsonAsync().then(result => result.data);

        if (!fileData) {
            continue;
        }

        if (/Map\d{3,}/.test(file.getName()) && DKTools.Utils.isString(fileData.displayName)) {
            processMatch(regex, fileData.displayName);
        }

        _.forEach(fileData, parseObject);
    }

    $plugins.forEach((plugin) => {
        parseObject(new DKTools.ParameterManager(plugin.name).params);
    });

    const promises = DKTools.Localization.locales.map(async (locale) => {
        const basePath = DKTools.Localization._dataPath + locale;
        const file = new DKTools.IO.File(basePath + '.json');
        const localizationData = await DKTools.Localization._loadData(locale);
        let needSave = false;

        if (localizationData) {
            const newData = {};

            _.forEach(data, (value, key) => {
                if (_.get(localizationData, key) === undefined) {
                    newData[key] = value;

                    needSave = true;
                }
            });

            if (!needSave) {
                return Promise.resolve();
            }

            const newFile = new DKTools.IO.File(basePath + '_new.json');

            return newFile.saveJsonAsync(newData, { createDirectory: true });
        } else {
            return file.saveJsonAsync(data, { createDirectory: true });
        }
    });

    Promise.all(promises).then(() => {
        alert('Localization tags updated!');
    });
});

DKTools.PluginCommandManager.set('ClearLocalizationCache', () => {
    DKTools.Localization.clearCache();
});

DKTools.PluginCommandManager.set('ExportAllText', async (args) => {
    if (!Utils.isNwjs()) {
        return;
    }

    const directory = new DKTools.IO.Directory('data/');
    const result = await directory.getJsonFilesAsync();

    if (result.status !== DKTools.IO.OK) {
        DKTools.Utils.throwError(new Error('Cannot load json files from folder "data/"'));

        return;
    }

    if (result.data.length === 0) {
        DKTools.Utils.throwError(new Error('Folder "data/" does not contain json files'));

        return;
    }

    const ignoredFiles = LocalizationParam.get('Ignored Files');
    const files = _.filter(result.data,
        file => !ignoredFiles.includes(file.getName()));

    if (files.length === 0) {
        return;
    }

    const exportFile = new DKTools.IO.File(DKTools.Localization._dataPath + '/export.txt');
    const ignoreTags = eval(args[0]) || false;
    const regex = DKTools.Localization.regexTag;
    const data = {};

    const parseObject = (object) => {
        if (!(object instanceof Object)) {
            return;
        }

        _.forEach(object, (value) => {
            if (DKTools.Utils.isString(value)) {
                try {
                    parseObject(JSON.parse(value));
                } catch (e) {
                    if (!data[value] && (!ignoreTags || !value.match(regex))) {
                        data[value] = true;
                    }
                }
            } else {
                parseObject(value);
            }
        });
    };

    for (const file of files) {
        const fileData = await file.loadJsonAsync().then(result => result.data);

        if (!fileData) {
            continue;
        }

        if (/Map\d{3,}/.test(file.getName()) && DKTools.Utils.isString(fileData.displayName)) {
            if (!data[fileData.displayName]) {
                data[fileData.displayName] = true;
            }
        }

        _.forEach(fileData, parseObject);
    }

    $plugins.forEach((plugin) => {
        parseObject(new DKTools.ParameterManager(plugin.name).params);
    });

    exportFile.saveAsync(Object.keys(data).join('\n')).then(() => {
        alert(`All text was exported! File path: ${exportFile.getFullPath()}`);
    });
});

//===========================================================================
// DKTools.Localization
//===========================================================================

/**
 * Static localization class
 * @class
 * @memberof DKTools
 */
DKTools.Localization = class {

    constructor() {
        return DKTools.Localization;
    }

    // static properties

    /**
     * @private
     * @static
     * @readonly
     * @type {String}
     */
    static get _localePath() {
        return DKTools.IO.normalizePath(LocalizationParam.get('Locale File'));
    }

    /**
     * @private
     * @static
     * @readonly
     * @type {String}
     */
    static get _dataPath() {
        return DKTools.IO.normalizePath(
            LocalizationParam.get('Localization Folder') + '/');
    }

    /**
     * @since 4.4.0
     *
     * @private
     * @static
     * @readonly
     * @type {String}
     */
    static get _webStoragePath() {
        return 'RPG Locale';
    }

    /**
     * @since 4.4.0
     *
     * @private
     * @static
     * @readonly
     * @type {DKTools.IO.File}
     */
    static get _file() {
        return new DKTools.IO.File(this._localePath);
    }

    // _initialize methods

    /**
     * @private
     * @static
     */
    static _initializeLanguages() {
        LocalizationParam.get('Languages').forEach((object) => {
            this._languages[object['Locale']] = object['Language'];
        });
    }

    /**
     * @private
     * @static
     * @async
     */
    static async _initializeLocale() {
        const locales = this.locales;

        if (locales.length > 0) {
            await this.loadLocale();

            if (!this._locale) {
                const firstLaunch = LocalizationParam.get('First Launch');
                const primaryLanguage = LocalizationParam.get('Languages',
                    { Primary: true });

                if (primaryLanguage) {
                    this._locale = primaryLanguage['Locale'];
                } else {
                    this._locale = locales[0];

                    if (!firstLaunch) {
                        console.warn('You have not installed the primary language of the game! Automatically selected locale: ' + this._locale);
                    }
                }

                if (!firstLaunch) {
                    await this.saveLocale();
                }
            }
        } else {
            await this.removeLocale();

            throw new Error(
                'Add at least one language! See help of plugin "DKTools_Localization"!');
        }
    }

    /**
     * @private
     * @static
     */
    static _initializeDecrypterIgnoreList() {
        this.locales.forEach((locale) => {
            const path = `img/system/${locale}/Window.png`;
            const file = new DKTools.IO.File(path);

            if (file.exists()) {
                Decrypter._ignoreList.push(path);
            }
        });
    }

    // initialize methods

    /**
     * Initializes the manager
     * @version 4.0.0
     * @static
     * @async
     */
    static async initialize() {

        /**
         * @private
         * @readonly
         * @type {String}
         */
        this._locale = '';

        /**
         * @private
         * @readonly
         * @type {Object}
         */
        this._languages = {};

        await this._initializeLanguages();
        await this._initializeLocale();
        await this._initializeDecrypterIgnoreList();

        if (Utils.isNwjs() && Utils.isTest()) {
            await this._checkData();
        }

        await this.clearCache();
        await this.loadData();
        await this.loadFont();
        await this.updateLoadingImage();

        /**
         * @private
         * @readonly
         * @type {Boolean}
         */
        this._isReady = true;
    }

    // clear methods

    /**
     * Clears the cache
     * @version 5.0.0
     * @static
     */
    static clearCache() {
        /**
         * @private
         * @readonly
         * @type {Object}
         */
        this._cache = {};

        /**
         * @private
         * @readonly
         * @type {Object}
         */
        this._cacheVariables = {};

        /**
         * @private
         * @readonly
         * @type {Object}
         */
        this._folders = {};
    }

    // _check methods

    /**
     * Checks a directory and files with translations
     * Creates a directory and files if they are missing
     * @version 5.1.3
     * @private
     * @static
     * @async
     */
    static async _checkData() {
        const dataPath = this._dataPath;
        const directory = new DKTools.IO.Directory(dataPath);

        if (!directory.exists()) {
            const status = await directory.createAsync();

            if (status === DKTools.IO.OK) {
                console.log(
                    'Created a directory for localization: ' + dataPath);
            } else {
                console.error(
                    'Localization can not create a directory for localization: ' + dataPath);
            }
        }

        const locales = this.locales;

        for (const locale of locales) {
            const basePath = dataPath + locale;
            const directory = new DKTools.IO.Directory(basePath);
            const file = new DKTools.IO.File(directory.getFullPath() + '/main.json');
            const oldVersionsFile = new DKTools.IO.File(basePath + '.json');

            if (oldVersionsFile.exists()) {
                continue;
            }

            if (!directory.exists()) {
                const status = await directory.createAsync();

                if (status === DKTools.IO.OK) {
                    console.log(
                        `Created a directory for locale (${locale}): ${directory.getFullPath()}`);
                } else {
                    console.error(
                        `Localization can not create a directory for locale (${locale}): ${directory.getFullPath()}`);
                }
            }

            if (!file.exists() && directory.exists()) {
                const result = await directory.getJsonFilesAsync();

                if (result.status === DKTools.IO.OK && result.data.length > 0) {
                    return;
                }

                const status = await file.saveJsonAsync({});

                if (status === DKTools.IO.OK) {
                    console.log(
                        `Created a file for locale (${locale}): ${file.getFullPath()}`);
                } else {
                    console.error(
                        `Localization can not create a file for locale (${locale}): ${file.getFullPath()}`);
                }
            }
        }
    }

    // check methods

    /**
     * Returns true if locale is valid
     * @static
     * @param {String} locale - Locale
     * @return {Boolean} Locale is valid
     */
    static checkLocale(locale) {
        return this.locales.includes(locale);
    }

    /**
     * Checks the cache
     * @version 5.0.0
     * @static
     * @param {Number} variableId - Variable ID
     */
    static checkCache(variableId) {
        if (!this._cacheVariables[variableId]) {
            return;
        }

        this._cache = Object.keys(this._cache).reduce((acc, key) => {
            const cache = this._cache[key];

            if (cache.variables && !cache.variables.includes(variableId)) {
                acc[key] = cache;
            }

            return acc;
        }, {});
    }

    // get methods

    /**
     * @version 4.2.0
     * @private
     * @static
     * @return {String}
     */
    static _getText(text) {
        const parseDepth = LocalizationParam.get('Parse Depth');
        const regexVar = this.regexVar;
        const regex = this.regexTag;
        const data = this._data;
        const cacheVariables = this._cacheVariables;
        const initialText = text;
        const variables = [];
        const varReplace = (text) => {
            return text.replace(regexVar, (string, match) => {
                const id = Number(match);

                cacheVariables[id] = true;

                variables.push(id);
                needCache = true;

                return $gameVariables.value(id);
            });
        };
        const textReplace = (text, regex) => {
            return text.replace(regex, (string, match) => {
                if (data.hasOwnProperty(match)) {
                    needCache = true;

                    return data[match];
                } else {
                    const value = _.get(data, match);

                    if (DKTools.Utils.isString(value)) {
                        needCache = true;

                        return value;
                    }
                }

                return match;
            });
        };
        const parseText = (text) => {
            text = varReplace(text);
            text = textReplace(text, regex);
            text = varReplace(text);

            return text;
        };

        let needCache = false;

        for (let i = 0; i < parseDepth; i++) {
            text = parseText(text);

            if (!needCache) {
                break;
            }
        }

        if (needCache && initialText.length >= LocalizationParam.get('Text Length')) {
            this._cache[initialText] = { variables, text };
        }

        return text;
    }

    /**
     * Returns localized text
     * @static
     * @param {String} text - Text
     * @return {String} Localized text
     */
    static getText(text) {
        text = String(text);

        if (text.length < 3 || !this._data) {
            return text;
        }

        if (this._cache[text]) {
            return this._cache[text].text;
        }

        return this._getText(text);
    }

    /**
     * Returns the previous locale from the list
     * @static
     * @return {String | null} Previous locale from the list
     */
    static getPrevLocale() {
        const locales = this.locales;
        let index = locales.indexOf(this._locale);

        if (index >= 0) {
            index--;

            if (index < 0) {
                index = locales.length - 1;
            }

            return locales[index];
        }

        return null;
    }

    /**
     * Returns the next locale from the list
     * @static
     * @return {String | null} Next locale from the list or null
     */
    static getNextLocale() {
        const locales = this.locales;
        let index = locales.indexOf(this._locale);

        if (index >= 0) {
            index++;

            if (index === locales.length) {
                index = 0;
            }

            return locales[index];
        }

        return null;
    }

    /**
     * Returns the previous language from the list
     * @static
     * @return {String | null} Previous language from the list or null
     */
    static getPrevLanguage() {
        const locale = this.getPrevLocale();

        if (locale) {
            return this._languages[locale];
        }

        return null;
    }

    /**
     * Returns the next language from the list
     * @static
     * @return {String | null} Next language from the list or null
     */
    static getNextLanguage() {
        const locale = this.getNextLocale();

        if (locale) {
            return this._languages[locale];
        }

        return null;
    }

    /**
     * Returns the language of the game by the locale of the game
     * @static
     * @param {String} locale - Locale
     * @return {String | undefined} Language or undefined
     */
    static getLanguageByLocale(locale) {
        return this._languages[locale];
    }

    /**
     * Returns the locale of the game by the name of the language
     * @static
     * @param {String} language - Language
     * @return {String | undefined} Locale or undefined
     */
    static getLocaleByLanguage(language) {
        const languages = _.reduce(this._languages, (acc, value, key) => {
            acc[value] = key;

            return acc;
        }, {});

        return languages[language];
    }

    /**
     * Returns the primary locale
     * @since 5.0.0
     * @static
     * @return {String | null} Primary locale
     */
    static getPrimaryLocale() {
        return LocalizationParam.get('Languages', { Primary: true }, { key: 'Locale' })
            || null;
    }

    /**
     * Returns the primary language
     * @since 5.0.0
     * @static
     * @return {String | null} Primary language
     */
    static getPrimaryLanguage() {
        return LocalizationParam.get('Languages', { Primary: true }, { key: 'Language' })
            || null;
    }

    /**
     * Returns the folder for an audio by locale
     * @version 5.1.3
     * @since 5.0.0
     * @static
     * @param {String} folder - Folder
     * @param {String} filename - Filename
     * @param {String} [locale=this.locale] - Locale
     * @return {String} Folder for an audio by locale
     */
    static getAudioFolder(folder, filename, locale = this.locale) {
        if (!folder || !filename || !Utils.isNwjs() && DKTools.IO.mode === DKTools.IO.MODE_NWJS) {
            return folder;
        }

        const basePath = AudioManager._path || AudioManager._basePath;
        const key = DKTools.IO.reverseSlashes(
            DKTools.IO.normalizePath(folder + '/' + filename));
        const currentLocale = this.locale;

        if (this._folders[key] && locale === currentLocale) {
            return this._folders[key];
        }

        const newFolder = DKTools.IO.normalizePath(folder + '/' + locale + '/');
        const newFileName = filename + AudioManager.audioFileExt();
        let newPath = DKTools.IO.normalizePath(basePath + '/' + newFolder + '/' + newFileName);

        if (new DKTools.IO.File(newPath).exists()) {
            if (locale === currentLocale) {
                this._folders[key] = newFolder;
            }

            return newFolder;
        }

        if (Decrypter.hasEncryptedAudio || !$dataSystem) {
            newPath = DKTools.IO.normalizePath(basePath + '/' + newFolder + '/' + Decrypter.extToEncryptExt(newFileName));

            if (new DKTools.IO.File(newPath).exists()) {
                if (locale === currentLocale) {
                    this._folders[key] = newFolder;
                }

                return newFolder;
            }
        }

        if (locale === currentLocale) {
            this._folders[key] = folder;
        }

        return folder;
    }

    /**
     * Returns the folder for an image by locale
     * @version 5.1.3
     * @since 5.0.0
     * @static
     * @param {String} folder - Folder
     * @param {String} filename - Filename
     * @param {String} [locale=this.locale] - Locale
     * @return {String} Folder for an image by locale
     */
    static getImageFolder(folder, filename, locale = this.locale) {
        if (!folder || !filename || !Utils.isNwjs() && DKTools.IO.mode === DKTools.IO.MODE_NWJS) {
            return folder;
        }

        const key = DKTools.IO.reverseSlashes(
            DKTools.IO.normalizePath(folder + '/' + filename));
        const currentLocale = this.locale;

        if (this._folders[key] && locale === currentLocale) {
            return this._folders[key];
        }

        const newFolder = DKTools.IO.normalizePath(folder + '/' + locale + '/');
        const newFileName = filename + ImageManager.imageFileExt();
        let newPath = DKTools.IO.normalizePath(newFolder + '/' + newFileName);

        if (new DKTools.IO.File(newPath).exists()) {
            if (locale === currentLocale) {
                this._folders[key] = newFolder;
            }

            return newFolder;
        }

        if (Decrypter.hasEncryptedImages || !$dataSystem) {
            newPath = DKTools.IO.normalizePath(newFolder + '/' + Decrypter.extToEncryptExt(newFileName));

            if (new DKTools.IO.File(newPath).exists()) {
                if (locale === currentLocale) {
                    this._folders[key] = newFolder;
                }

                return newFolder;
            }
        }

        if (locale === currentLocale) {
            this._folders[key] = folder;
        }

        return folder;
    }

    /**
     * Returns the folder for a video by locale
     * @version 5.1.3
     * @since 5.1.1
     * @static
     * @param {String} folder - Folder
     * @param {String} filename - Filename (with extension)
     * @param {String} [locale=this.locale] - Locale
     * @return {String} Folder for a video by locale
     */
    static getVideoFolder(folder, filename, locale = this.locale) {
        if (!folder || !filename || !Utils.isNwjs() && DKTools.IO.mode === DKTools.IO.MODE_NWJS) {
            return folder;
        }

        const key = DKTools.IO.reverseSlashes(
            DKTools.IO.normalizePath(folder + '/'));
        const currentLocale = this.locale;

        if (this._folders[key] && locale === currentLocale) {
            return this._folders[key];
        }

        const newFolder = DKTools.IO.normalizePath(folder + '/' + locale + '/');
        const newPath = DKTools.IO.normalizePath(newFolder + '/' + filename);
        const file = new DKTools.IO.File(newPath);

        if (file.exists()) {
            if (locale === currentLocale) {
                this._folders[key] = newFolder;
            }

            return newFolder;
        }

        if (locale === currentLocale) {
            this._folders[key] = folder;
        }

        return folder;
    }

    // is methods

    /**
     * Returns true if the manager is ready
     * @since 4.0.0
     * @static
     * @return {Boolean} Manager is ready
     */
    static isReady() {
        return this._isReady;
    }

    /**
     * Returns true if the locale file exists
     * @version 5.1.3
     * @since 4.4.0
     * @static
     * @return {Boolean} Locale file exists
     */
    static isLocaleFileExists() {
        if (Utils.isNwjs()) {
            return this._file.exists();
        }

        return DKTools.IO.WebStorage.exists(this._webStoragePath);
    }

    // load methods

    /**
     * Loads the data
     * @version 4.2.0
     * @since 4.0.0
     * @private
     * @static
     * @async
     * @param {String} locale - Locale
     * @return {Object} Data
     */
    static async _loadData(locale) {
        const directoryPath = this._dataPath + locale;
        const directory = new DKTools.IO.Directory(directoryPath);
        const data = {};

        const processFile = async (file) => {
            const result = await file.loadJsonAsync();

            if (result.status === DKTools.IO.OK) {
                if (Array.isArray(result.data)) {
                    data[file.getName()] = result.data;

                    return;
                }

                _.forEach(result.data, (value, key) => {
                    if (data[key] === undefined) {
                        data[key] = value;
                    }
                });
            } else {
                const fullPath = file.getFullPath();

                if (result.status === DKTools.IO.ERROR_PARSING_DATA) {
                    let message = `Can not parse JSON data from file: ${fullPath}.`;

                    if (result.error && result.error.message) {
                        message += ' Description: ' + result.error.message;
                    }

                    DKTools.Utils.throwError(new Error(message));
                } else {
                    DKTools.Utils.throwError(
                        new Error(`Can not load localization data from file: ${fullPath}`));
                }
            }

            return Promise.resolve();
        };

        if (directory.exists()) {
            const files = await directory.getJsonFilesAsync()
                                          .then(result => result.data);

            if (files.length > 0) {
                await Promise.all(files.map(processFile));
            } else {
                DKTools.Utils.throwError(
                    new Error(`Localization directory is empty: ${directoryPath}`));
            }
        } else {
            const filePath = directoryPath + '.json';
            const file = new DKTools.IO.File(filePath);

            if (file.exists()) {
                await processFile(file);
            } else {
                DKTools.Utils.throwError(
                    new Error(`Localization file does not exist: ${filePath}`));
            }
        }

        return data;
    }

    /**
     * Loads the locale
     * @version 4.2.0
     * @static
     * @async
     */
    static async loadLocale() {
        let locale;

        if (Utils.isNwjs()) {
            locale = await this._file.loadAsync().then(result => result.data);
        } else {
            locale = DKTools.IO.WebStorage.load(this._webStoragePath).data;
        }

        if (this.checkLocale(locale)) {
            this._locale = locale;
        } else if (!LocalizationParam.get('First Launch')) {
            await this.removeLocale();
        }
    }

    /**
     * Loads the data
     * @version 4.0.0
     * @static
     * @async
     */
    static async loadData() {
        this._data = await this._loadData(this._locale);
    }

    /**
     * Loads the font
     * @version 4.2.0
     * @static
     * @async
     */
    static async loadFont() {
        return new Promise((resolve) => {
            const font = LocalizationParam.get('Fonts', { Locale: this.locale }, { key: 'Font' }) ||
                LocalizationParam.get('Standard Font');

            Graphics.loadFont('GameFont', 'fonts/' + font);

            if (Graphics.isFontLoaded('GameFont')) {
                resolve();
            } else {
                const interval = setInterval(() => {
                    if (Graphics.isFontLoaded('GameFont')) {
                        clearInterval(interval);

                        resolve();
                    }
                }, 50);
            }
        });
    }

    // other methods

    /**
     * Saves the locale
     * @version 4.0.0
     * @static
     * @async
     */
    static async saveLocale() {
        if (Utils.isNwjs()) {
            await this._file.saveAsync(this._locale, { createDirectory: true });
        } else {
            DKTools.IO.WebStorage.save(this._webStoragePath, this._locale);
        }
    }

    /**
     * Removes the locale
     * @static
     * @async
     */
    static async removeLocale() {
        if (Utils.isNwjs()) {
            await this._file.removeAsync();
        } else {
            DKTools.IO.WebStorage.remove(this._webStoragePath);
        }
    }

    /**
     * Selects the previous locale from the list
     * @static
     * @async
     * @return {Promise}
     */
    static async selectPrevLocale() {
        return this.selectLocale(this.getPrevLocale());
    }

    /**
     * Selects the next locale from the list
     * @static
     * @async
     * @return {Promise}
     */
    static async selectNextLocale() {
        return this.selectLocale(this.getNextLocale());
    }

    /**
     * Selects the locale
     * @since 5.0.0
     * @static
     * @async
     * @param {String} locale - Locale
     * @return {Promise}
     */
    static async selectLocale(locale) {
        if (this.checkLocale(locale)) {
            const previousLocale = this._locale;

            this._locale = locale;

            if (this._locale !== previousLocale || !this.isLocaleFileExists()) {
                await this.saveLocale();
            }

            if (this._locale !== previousLocale) {
                await this._onLocaleChange(previousLocale);
            }
        } else {
            return Promise.reject('You are trying to establish a non-existent locale: ' + locale);
        }
    }

    /**
     * Handles the change of the game locale
     * @version 5.0.0
     * @private
     * @static
     * @async
     * @param {String} previousLocale - Previous locale
     */
    static async _onLocaleChange(previousLocale) {
        await this.clearCache();
        await this.loadData();
        await this.loadFont();
        await this.updateLoadingImage();
        await this.updateGameTitle();

        for (const listener of this._listeners) {
            await listener(previousLocale, this._locale);
        }
    }

    /**
     * Adds a listener of change of the game locale
     * @static
     * @param {Function} listener - Listener (sync/async function)
     * @example
     * DKTools.Localization.addChangeLocaleListener((previousLocale, locale) => {
     *      // your code
     * });
     */
    static addChangeLocaleListener(listener) {
        if (DKTools.Utils.isFunction(listener)) {
            this._listeners.push(listener);
        }
    }

    // update methods

    /**
     * Updates the game title
     * @since 4.5.0
     * @static
     */
    static updateGameTitle() {
        document.title = this.getText($dataSystem.gameTitle);
    }

    /**
     * Updates the image of loading
     * @version 4.3.0
     * @static
     */
    static updateLoadingImage() {
        if (!Utils.isNwjs() && DKTools.IO.mode === DKTools.IO.MODE_NWJS) {
            return;
        }

        const filename = 'Loading.png';
        const basePath = DKTools.IO.normalizePath('img/system/' + this._locale);
        const fullPath = DKTools.IO.normalizePath(basePath + '/' + filename);

        if (DKTools.IO.pathExists(fullPath)) {
            Graphics.setLoadingImage(fullPath);
        } else if (Decrypter.hasEncryptedImages || !$gameSystem) {
            if (DKTools.IO.pathExists(basePath + '/' + Decrypter.extToEncryptExt(filename))) {
                Graphics.setLoadingImage(fullPath);
            }
        }
    }

};

// properties

Object.defineProperties(DKTools.Localization, {

    /**
     * @private
     * @type {Object}
     * @memberof DKTools.Localization
     */
    _folders: { value: {}, writable: true },

    /**
     * @private
     * @type {Function[]}
     * @memberof DKTools.Localization
     */
    _listeners: { value: [] },

    /**
     * @private
     * @readonly
     * @type {RegExp}
     * @memberof DKTools.Localization
     */
    regexVar: { value: /\\VAR\[(\d+)\]/g },

    /**
     * @since 5.0.0
     * @private
     * @readonly
     * @type {RegExp}
     * @memberof DKTools.Localization
     */
    regexTag: { value: /\{(.*?)\}/g },

    /**
     * Locale of the game
     * @readonly
     * @type {String}
     * @memberof DKTools.Localization
     */
    locale: {
        get: function() {
            return this._locale;
        },
        configurable: true
    },

    /**
     * Language of the game
     * @readonly
     * @type {String}
     * @memberof DKTools.Localization
     */
    language: {
        get: function() {
            return this._languages[this._locale];
        },
        configurable: true
    },

    /**
     * Languages of the game
     * @readonly
     * @type {String[]}
     * @memberof DKTools.Localization
     */
    languages: {
        get: function() {
            return Object.values(this._languages);
        },
        configurable: true
    },

    /**
     * Locales of the game
     * @readonly
     * @type {String[]}
     * @memberof DKTools.Localization
     */
    locales: {
        get: function() {
            return Object.keys(this._languages);
        },
        configurable: true
    }

});

//===========================================================================
// DKTools.StartupManager
//===========================================================================

const Localization_DKTools_StartupManager_initializeModules =
    DKTools.StartupManager.initializeModules;
DKTools.StartupManager.initializeModules = async function() {
    await Localization_DKTools_StartupManager_initializeModules.apply(this, arguments);
    await DKTools.Localization.initialize();
};

//===========================================================================
// DKTools.PreloadManager
//===========================================================================

const Localization_DKTools_PreloadManager_processAudioFile =
    DKTools.PreloadManager._processAudioFile;
DKTools.PreloadManager._processAudioFile = function(file, object) {
    const name = file.getName();
    const path = DKTools.Localization.getAudioFolder(file.getDirectoryName(), name)
        + '/' + name + file.getExtension();

    Localization_DKTools_PreloadManager_processAudioFile.call(this,
        new DKTools.IO.File(path), object);
};

const Localization_DKTools_PreloadManager_processImageFile =
    DKTools.PreloadManager._processImageFile;
DKTools.PreloadManager._processImageFile = function(file, object) {
    const name = file.getName();
    const path = DKTools.Localization.getImageFolder(file.getPath(), name)
        + '/' + name + file.getExtension();

    Localization_DKTools_PreloadManager_processImageFile.call(this,
        new DKTools.IO.File(path), object);
};

//===========================================================================
// DKTools.Base
//===========================================================================

const Localization_DKTools_Base_textWrap = DKTools.Base.prototype.textWrap;
DKTools.Base.prototype.textWrap = function(text, options = {}) {
    return Localization_DKTools_Base_textWrap.call(
        this, DKTools.Localization.getText(text), options);
};

const Localization_DKTools_Base_drawTextEx = DKTools.Base.prototype.drawTextEx;
DKTools.Base.prototype.drawTextEx = function(text, options) {
    return Localization_DKTools_Base_drawTextEx.call(
        this, DKTools.Localization.getText(text), options);
};

const Localization_DKTools_Base_convertEscapeCharacters =
    DKTools.Base.prototype.convertEscapeCharacters;
DKTools.Base.prototype.convertEscapeCharacters = function() {
    return DKTools.Localization.getText(
        Localization_DKTools_Base_convertEscapeCharacters.apply(this, arguments))
            .replace(/\x1blanguage/gi, () => DKTools.Localization.language);
};

//===========================================================================
// DKTools.Sprite
//===========================================================================

const Localization_DKTools_Sprite_textWrap = DKTools.Sprite.prototype.textWrap;
DKTools.Sprite.prototype.textWrap = function(text, options = {}) {
    return Localization_DKTools_Sprite_textWrap.call(
        this, DKTools.Localization.getText(text), options);
};

const Localization_DKTools_Sprite_drawTextEx = DKTools.Sprite.prototype.drawTextEx;
DKTools.Sprite.prototype.drawTextEx = function(text, options) {
    return Localization_DKTools_Sprite_drawTextEx.call(
        this, DKTools.Localization.getText(text), options);
};

const Localization_DKTools_Sprite_convertEscapeCharacters =
    DKTools.Sprite.prototype.convertEscapeCharacters;
DKTools.Sprite.prototype.convertEscapeCharacters = function() {
    return DKTools.Localization.getText(
        Localization_DKTools_Sprite_convertEscapeCharacters.apply(this, arguments))
            .replace(/\x1blanguage/gi, () => DKTools.Localization.language);
};

const Localization_DKTools_Sprite_processEscapeCharacter =
    DKTools.Sprite.prototype.processEscapeCharacter;
DKTools.Sprite.prototype.processEscapeCharacter = function(code, textState) {
    if (code === 'MFS') {
        this.makeFontSmaller();
    } else if (code === 'MFB') {
        this.makeFontBigger();
    } else {
        Localization_DKTools_Sprite_processEscapeCharacter.apply(this, arguments);
    }
};

//===========================================================================
// DKTools.Window
//===========================================================================

const Localization_DKTools_Window_textWrap = DKTools.Window.prototype.textWrap;
DKTools.Window.prototype.textWrap = function(text, options = {}) {
    return Localization_DKTools_Window_textWrap.call(
        this, DKTools.Localization.getText(text), options);
};

//===========================================================================
// Bitmap
//===========================================================================

const Localization_Bitmap_drawText = Bitmap.prototype.drawText;
Bitmap.prototype.drawText = function(text, x, y, maxWidth, lineHeight, align) {
    Localization_Bitmap_drawText.call(
        this, DKTools.Localization.getText(text), x, y, maxWidth, lineHeight, align);
};

//===========================================================================
// Graphics
//===========================================================================

const Localization_Graphics_playVideo = Graphics.playVideo;
Graphics.playVideo = function(src) {
    const parts = src.split('/');
    const filename = parts.pop();
    const folder = DKTools.Localization.getVideoFolder(parts.join('/'), filename);

    Localization_Graphics_playVideo.call(this, folder + '/' + filename);
};

//===========================================================================
// ImageManager
//===========================================================================

const Localization_ImageManager_loadBitmap = ImageManager.loadBitmap;
ImageManager.loadBitmap = function(folder, filename, hue, smooth) {
    return Localization_ImageManager_loadBitmap.call(
        this,
        DKTools.Localization.getImageFolder(folder, filename),
        filename,
        hue,
        smooth);
};

const Localization_ImageManager_reserveBitmap = ImageManager.reserveBitmap;
ImageManager.reserveBitmap = function(folder, filename, hue, smooth, reservationId) {
    return Localization_ImageManager_reserveBitmap.call(
        this,
        DKTools.Localization.getImageFolder(folder, filename),
        filename,
        hue,
        smooth,
        reservationId);
};

const Localization_ImageManager_requestBitmap = ImageManager.requestBitmap;
ImageManager.requestBitmap = function(folder, filename, hue, smooth) {
    return Localization_ImageManager_requestBitmap.call(
        this,
        DKTools.Localization.getImageFolder(folder, filename),
        filename,
        hue,
        smooth);
};

//===========================================================================
// AudioManager
//===========================================================================

const Localization_AudioManager_createBuffer = AudioManager.createBuffer;
AudioManager.createBuffer = function(folder, name, reservationId) {
    return Localization_AudioManager_createBuffer.call(
        this,
        DKTools.Localization.getAudioFolder(folder, name),
        name,
        reservationId);
};

//===========================================================================
// TextManager
//===========================================================================

const Localization_TextManager_basic = TextManager.basic;
TextManager.basic = function(basicId) {
    return DKTools.Localization.getText(
        Localization_TextManager_basic.apply(this, arguments));
};

const Localization_TextManager_param = TextManager.param;
TextManager.param = function(paramId) {
    return DKTools.Localization.getText(
        Localization_TextManager_param.apply(this, arguments));
};

const Localization_TextManager_command = TextManager.command;
TextManager.command = function(commandId) {
    return DKTools.Localization.getText(
        Localization_TextManager_command.apply(this, arguments));
};

const Localization_TextManager_message = TextManager.message;
TextManager.message = function(messageId) {
    return DKTools.Localization.getText(
        Localization_TextManager_message.apply(this, arguments));
};

// properties

Object.defineProperty(TextManager, 'currencyUnit', {
    get: function() {
        return DKTools.Localization.getText($dataSystem.currencyUnit);
    },
    configurable: true
});

//===========================================================================
// Game_System
//===========================================================================

const Localization_Game_System_isJapanese = Game_System.prototype.isJapanese;
Game_System.prototype.isJapanese = function() {
    return Boolean(Localization_Game_System_isJapanese.apply(this, arguments)
        || DKTools.Localization.locale.match(/^ja/));
};

const Localization_Game_System_isChinese = Game_System.prototype.isChinese;
Game_System.prototype.isChinese = function() {
    return Boolean(Localization_Game_System_isChinese.apply(this, arguments)
        || DKTools.Localization.locale.match(/^zh/));
};

const Localization_Game_System_isKorean = Game_System.prototype.isKorean;
Game_System.prototype.isKorean = function() {
    return Boolean(Localization_Game_System_isKorean.apply(this, arguments)
        || DKTools.Localization.locale.match(/^ko/));
};

const Localization_Game_System_isCJK = Game_System.prototype.isCJK;
Game_System.prototype.isCJK = function() {
    return Boolean(Localization_Game_System_isCJK.apply(this, arguments)
        || DKTools.Localization.locale.match(/^(ja|zh|ko)/));
};

Game_System.prototype.isRussian = function() {
    return Boolean(DKTools.Localization.locale.match(/^ru/));
};

//===========================================================================
// Game_Message
//===========================================================================

const Localization_Game_Message_add = Game_Message.prototype.add;
Game_Message.prototype.add = function(text) {
    Localization_Game_Message_add.call(
        this, DKTools.Localization.getText(text));
};

const Localization_Game_Message_setChoices = Game_Message.prototype.setChoices;
Game_Message.prototype.setChoices = function(choices, defaultType, cancelType) {
    choices = choices.map(choice => DKTools.Localization.getText(choice));

    Localization_Game_Message_setChoices.call(this, choices, defaultType, cancelType);
};

//===========================================================================
// Game_Variables
//===========================================================================

const Localization_Game_Variables_setValue = Game_Variables.prototype.setValue;
Game_Variables.prototype.setValue = function(id, value) {
    const lastValue = this.value(id);

    Localization_Game_Variables_setValue.apply(this, arguments);

    if (lastValue !== this.value(id)) {
        DKTools.Localization.checkCache(id);
    }
};

//===========================================================================
// Game_Map
//===========================================================================

const Localization_Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
    Localization_Game_Map_setup.apply(this, arguments);
    DKTools.Localization.clearCache();
};

//===========================================================================
// Window_Base
//===========================================================================

const Localization_Window_Base_textWidth =
    Window_Base.prototype.textWidth;
Window_Base.prototype.textWidth = function(text) {
    return Localization_Window_Base_textWidth.call(
        this, DKTools.Localization.getText(text));
};

const Localization_Window_Base_drawTextEx =
    Window_Base.prototype.drawTextEx;
Window_Base.prototype.drawTextEx = function(text, x, y) {
    return Localization_Window_Base_drawTextEx.call(
        this, DKTools.Localization.getText(text), x, y);
};

const Localization_Window_Base_actorName =
    Window_Base.prototype.actorName;
Window_Base.prototype.actorName = function(n) {
    return DKTools.Localization.getText(
        Localization_Window_Base_actorName.apply(this, arguments));
};

const Localization_Window_Base_partyMemberName =
    Window_Base.prototype.partyMemberName;
Window_Base.prototype.partyMemberName = function(n) {
    return DKTools.Localization.getText(
        Localization_Window_Base_partyMemberName.apply(this, arguments));
};

const Localization_Window_Base_convertEscapeCharacters =
    Window_Base.prototype.convertEscapeCharacters;
Window_Base.prototype.convertEscapeCharacters = function(text) {
    return DKTools.Localization.getText(
        Localization_Window_Base_convertEscapeCharacters.apply(this, arguments))
            .replace(/\x1blanguage/gi, () => DKTools.Localization.language);
};

const Localization_Window_Base_processEscapeCharacter =
    Window_Base.prototype.processEscapeCharacter;
Window_Base.prototype.processEscapeCharacter = function(code, textState) {
    if (code === 'MFS') {
        this.makeFontSmaller();
    } else if (code === 'MFB') {
        this.makeFontBigger();
    } else {
        Localization_Window_Base_processEscapeCharacter.apply(this, arguments);
    }
};

//=============================================================================
// Window_TitleCommand
//=============================================================================

const Localization_Window_TitleCommand_makeCommandList =
    Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function() {
    Localization_Window_TitleCommand_makeCommandList.apply(this, arguments);

    if (LocalizationParam.get('Show Command')) {
        this.addLocaleCommand();
    }
};

Window_TitleCommand.prototype.addLocaleCommand = function() {
    this.addCommand(LocalizationParam.get('Command Name'), 'locale');
};

//===========================================================================
// Window_NameEdit
//===========================================================================

const Localization_Window_NameEdit_initialize =
    Window_NameEdit.prototype.initialize;
Window_NameEdit.prototype.initialize = function(actor, maxLength) {
    Localization_Window_NameEdit_initialize.apply(this, arguments);
    this._name = DKTools.Localization.getText(this._name).slice(0, this._maxLength);
    this._index = this._name.length;
};

//===========================================================================
// Window_Options
//===========================================================================

const Localization_Window_Options_makeCommandList =
    Window_Options.prototype.makeCommandList;
Window_Options.prototype.makeCommandList = function() {
    Localization_Window_Options_makeCommandList.apply(this, arguments);

    if (!Imported['YEP_OptionsCore'] && LocalizationParam.get('Show Options Command')) {
        this.addLocaleCommand();
    }
};

Window_Options.prototype.addLocaleCommand = function() {
    this.addCommand(LocalizationParam.get('Options Command Name'), 'locale');
};

const Localization_Window_Options_statusText =
    Window_Options.prototype.statusText;
Window_Options.prototype.statusText = function(index) {
    const symbol = this.commandSymbol(index);

    if (symbol === 'locale') {
        return DKTools.Localization.language;
    }

    return Localization_Window_Options_statusText.apply(this, arguments);
};

const Localization_Window_Options_getConfigValue =
    Window_Options.prototype.getConfigValue;
Window_Options.prototype.getConfigValue = function(symbol) {
    if (symbol === 'locale') {
        return DKTools.Localization.locale;
    }

    return Localization_Window_Options_getConfigValue.apply(this, arguments);
};

const Localization_Window_Options_setConfigValue =
    Window_Options.prototype.setConfigValue;
Window_Options.prototype.setConfigValue = function(symbol, volume) {
    if (symbol === 'locale') {
        DKTools.Localization.selectNextLocale().then(() => {
            if (SceneManager.isCurrentScene(Scene_Options)) {
                SceneManager._scene.onLocaleChange();
            } else {
                this.refresh();
            }
        });
    } else {
        Localization_Window_Options_setConfigValue.apply(this, arguments);
    }
};

//===========================================================================
// Scene_Boot
//===========================================================================

Scene_Boot.prototype.updateDocumentTitle = function() {
    DKTools.Localization.updateGameTitle();
};

//=============================================================================
// Scene_Title
//=============================================================================

const Localization_Scene_Title_create = Scene_Title.prototype.create;
Scene_Title.prototype.create = function() {
    Localization_Scene_Title_create.apply(this, arguments);

    if (this.needsSelectLanguage()) {
        SceneManager.goto(Scene_SelectLanguage);
        SceneManager.prepareNextScene(Scene_Title, { firstLaunch: true });

        return;
    }

    if (LocalizationParam.get('Show Button')) {
        this.createLocalizationButton();
    }
};

const Localization_Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
    Localization_Scene_Title_createCommandWindow.apply(this, arguments);

    if (LocalizationParam.get('Show Command')) {
        this._commandWindow.setHandler('locale', this.onCommandLocale);
    }
};

Scene_Title.prototype.createLocalizationButton = function() {
    const x = LocalizationParam.get('Button X');
    const y = LocalizationParam.get('Button Y');
    const filename = LocalizationParam.get('Button Graphic')
                                       .format(DKTools.Localization.locale);

    this._localizationButton = new DKTools.Sprite.Button(x, y);
    this._localizationButton.loadSystem(filename);
    this._localizationButton.setupAnchor(0.5, 0.5);
    this._localizationButton.start(true);

    this._localizationButton.addEvent({
        type: 'state-pressed',
        onUpdate: function() {
            this.opacity = 200;
            this.scale.set(0.95, 0.95);
        }.bind(this._localizationButton)
    });

    this._localizationButton.addEvent({
        type: 'state-normal',
        onUpdate: function() {
            this.opacity = 255;
            this.scale.set(1, 1);
        }.bind(this._localizationButton)
    });

    this._localizationButton.addEvent({
        type: 'mouse-click-left',
        onUpdate: this.onCommandLocale.bind(this)
    });

    this._localizationButton.addEvent({
        type: 'touch',
        onUpdate: this.onCommandLocale.bind(this)
    });

    this._localizationButton.addOneTimeEvent({
        type: 'ready',
        onSuccess: function() {
            this.move(x + this.width / 2, y + this.height / 2);
        }.bind(this._localizationButton)
    });

    this.addChild(this._localizationButton);
};

Scene_Title.prototype.onCommandLocale = function() {
    SceneManager.push(Scene_SelectLanguage);
};

Scene_Title.prototype.needsSelectLanguage = function() {
    return LocalizationParam.get('First Launch') &&
        !DKTools.Localization.isLocaleFileExists();
};

//===========================================================================
// Scene_Options
//===========================================================================

Scene_Options.prototype.onLocaleChange = function() {
    if (this._optionsWindow) {
        this._optionsWindow.refresh();
    }

    if (Imported['YEP_OptionsCore']) {
        if (this._categoryWindow) {
            this._categoryWindow.refresh();
        }

        if (this._helpWindow) {
            this._helpWindow.refresh();
        }
    }
};

//===========================================================================
// Scene_SelectLanguage
//===========================================================================

function Scene_SelectLanguage() {
    this.initialize.apply(this, arguments);
}

Scene_SelectLanguage.prototype = Object.create(DKTools.Scene.prototype);
Scene_SelectLanguage.prototype.constructor = Scene_SelectLanguage;

// initialize

Scene_SelectLanguage.prototype.initialize = function() {
    DKTools.Scene.prototype.initialize.apply(this, arguments);
    this._locales = DKTools.Localization.locales;
    this._style = LocalizationParam.get('Style') || 'Window';
    this._styleOptions = LocalizationParam.get(`Style ${this._style}`) || {};
    this._options = {};
};

// prepare

Scene_SelectLanguage.prototype.prepare = function(nextScene, options = {}) {
    this._nextScene = nextScene;
    this._options = options;
};

// preloading methods

Scene_SelectLanguage.prototype.setupPreloading = function() {
    DKTools.Scene.prototype.setupPreloading.apply(this, arguments);

    const flagName = LocalizationParam.get('Flag Filename');
    const promises = DKTools.Localization.locales.map((locale) => {
        return DKTools.Utils.Bitmap.loadAsync({
            folder: 'img/system/',
            filename: flagName.format(locale)
        });
    });

    this._preloader.add(Promise.all(promises));
};

// create methods

Scene_SelectLanguage.prototype.createBackground = function() {
    const background = LocalizationParam.get('Background Filename');

    if (!background) {
        return;
    }

    this._background = new DKTools.Sprite();
    this._background.setupGraphicName(background);
    this._background.start();

    this.addChild(this._background);
};

Scene_SelectLanguage.prototype.createAllSprites = function() {
    if (this._style === 'Flags') {
        this.createFlags();
    }
};

Scene_SelectLanguage.prototype.createAllWindows = function() {
    if (this._style === 'Window') {
        this.createLanguageWindow();

        if (this._styleOptions['Help Window']['Show']) {
            this.createHelpWindow();
        }
    } else if (this._style === 'Flags') {
        if (this._styleOptions['Help Window']['Show']) {
            this.createHelpWindow();
        }

        if (this._styleOptions['Language Window']['Show']) {
            this.createLanguageNameWindow();
        }
    }
};

Scene_SelectLanguage.prototype.createLanguageWindow = function() {
    const flagName = LocalizationParam.get('Flag Filename');
    const fontSize = LocalizationParam.get('Font Size');
    const rowHeight = this._styleOptions['Row Height'];
    const items = this._locales.map(locale => ({
        name: DKTools.Localization.getLanguageByLocale(locale),
        symbol: 'ok',
        handler: this.onLanguageOk.bind(this),
        ext: locale
    }));

    this._languageWindow = new DKTools.Window.Selectable();

    this._languageWindow.setupItems(items);
    this._languageWindow.setupItemHeight(rowHeight);
    this._languageWindow.setupItemDrawHandler(function(index) {
        const language = this.itemName(index);
        const locale = this.itemExt(index);
        const rect = this.itemRectForText(index);
        const flag = ImageManager.loadSystem(flagName.format(locale));

        flag.addLoadListener(() => {
            const x = rect.x + flag.width + 4;

            this.drawBitmap(flag, {
                destination: {
                    x: rect.x,
                    y: rect.y + Math.max(0, (rect.height - flag.height) / 2),
                    height: rect.height
                }
            });

            this.contents.fontSize = fontSize;
            this.contents.drawText(language, x, rect.y,
                rect.width - x, rect.height, 'left');
        });
    }.bind(this._languageWindow));

    this._languageWindow.setupSize(
        this._styleOptions['Window Width'],
        String(Math.min(this._styleOptions['Window Rows'], this._locales.length)));

    this._languageWindow.move(
        (Graphics.boxWidth - this._languageWindow.width) / 2,
        (Graphics.boxHeight - this._languageWindow.height) / 2);

    if (!this._options.firstLaunch) {
        this._languageWindow.setHandler('cancel', this.onLanguageCancel.bind(this));
    }

    this._languageWindow.addEvent({
        type: 'select',
        onUpdate: () => {
            const locale = this._languageWindow.currentExt();

            if (this._helpWindow) {
                this._helpWindow.refreshAll();
            }

            this.refreshBackground(locale);
            this.refreshForeground(locale);
        }
    });

    this._languageWindow.start(true);

    this.addWindow(this._languageWindow);
};

Scene_SelectLanguage.prototype.createFlags = function() {
    const flagName = LocalizationParam.get('Flag Filename');

    this._flagSprites = this._locales.map((locale, index) => {
        const sprite = new DKTools.Sprite.Button();
        const selectHandler = function() {
            if (this._index === sprite.id) {
                if (this._styleOptions['Play Ok Sound']) {
                    SoundManager.playOk();
                }

                this.onLanguageOk();
            } else {
                if (this._styleOptions['Play Cursor Sound']) {
                    SoundManager.playCursor();
                }

                this.selectFlag(sprite.id);
            }
        }.bind(this);

        sprite.id = index;
        sprite.anchor.set(0.5, 0.5);
        sprite.setupGraphicName(flagName.format(locale));

        sprite.addEvent({
            type: 'mouse-click-left',
            onUpdate: selectHandler
        });

        sprite.addEvent({
            type: 'touch',
            onUpdate: selectHandler
        });

        sprite.start(true);

        return sprite;
    });

    this.addChild(...this._flagSprites);
    this.selectFlag(0);
};

Scene_SelectLanguage.prototype.createHelpWindow = function() {
    const fontSize = LocalizationParam.get('Font Size');
    const params = this._styleOptions['Help Window'];
    const width = eval(params['Width']);
    const x = (Graphics.boxWidth - width) / 2;
    const y = eval(params['Y']);
    const height = '1';

    this._helpWindow = new DKTools.Window(x, y, width, height);

    this._helpWindow.contentsSprite.setupFont({ fontSize });

    this._helpWindow.addEvent({
        type: 'draw-all',
        onUpdate: () => {
            const index = (this._style === 'Window' ? this._languageWindow.index() : this._index);
            const locale = this._locales[index];
            const data = LocalizationParam.get('Help Text', { Locale: locale });

            if (!data) {
                throw new Error(`Could not find help text for the locale: ${locale}`);
            }

            this._helpWindow.drawText(data['Text']);
        }
    });

    if (!params['Show Frame']) {
        this._helpWindow.hideFrame();
    }

    if (params['Background Opacity'] > 0) {
        this._helpWindow.backOpacity = params['Background Opacity'];
    } else if (params['Background Opacity'] === 0) {
        this._helpWindow.hideBack();
    }

    this._helpWindow.start();

    this.addWindow(this._helpWindow);
};

Scene_SelectLanguage.prototype.createLanguageNameWindow = function() {
    const fontSize = LocalizationParam.get('Font Size');
    const params = this._styleOptions['Language Window'];
    const width = eval(params['Width']);
    const x = (Graphics.boxWidth - width) / 2;
    const y = eval(params['Y']);
    const height = '1';

    this._languageNameWindow = new DKTools.Window(x, y, width, height);

    this._languageNameWindow.contentsSprite.setupFont({ fontSize });

    this._languageNameWindow.addEvent({
        type: 'draw-all',
        onUpdate: () => {
            const language = DKTools.Localization.getLanguageByLocale(
                this._locales[this._index]);

            this._languageNameWindow.drawText(language);
        }
    });

    if (!params['Show Frame']) {
        this._languageNameWindow.hideFrame();
    }

    if (params['Background Opacity'] > 0) {
        this._languageNameWindow.backOpacity = params['Background Opacity'];
    } else if (params['Background Opacity'] === 0) {
        this._languageNameWindow.hideBack();
    }

    this._languageNameWindow.start();

    this.addWindow(this._languageNameWindow);
};

Scene_SelectLanguage.prototype.createForeground = function() {
    const foreground = LocalizationParam.get('Foreground Filename');

    if (!foreground) {
        return;
    }

    this._foreground = new DKTools.Sprite();
    this._foreground.setupGraphicName(foreground);
    this._foreground.start();

    this.addChild(this._foreground);
};

// start methods

Scene_SelectLanguage.prototype.start = function() {
    DKTools.Scene.prototype.start.apply(this, arguments);

    if (this._options.firstLaunch) {
        const type = LocalizationParam.get('First Launch Cursor') || 'auto';
        let locale;

        if (type === 'auto') {
            locale = this._locales.find(
                locale => locale === window.navigator.language
                    || window.navigator.language.match(new RegExp(`^${locale}`)));
        } else if (type === 'primary') {
            locale = DKTools.Localization.getPrimaryLocale();
        }

        if (locale) {
            if (this._style === 'Window') {
                this._languageWindow.selectExt(locale);
            } else {
                const index = this._locales.indexOf(locale);

                if (this._index !== index) {
                    this.selectFlag(index);
                }
            }
        }
    } else {
        if (this._style === 'Window') {
            this._languageWindow.selectExt(DKTools.Localization.locale);
        } else {
            const index = this._locales.indexOf(DKTools.Localization.locale);

            if (this._index !== index) {
                this.selectFlag(index);
            }
        }
    }

    const bgm = LocalizationParam.get('BGM');

    if (bgm && bgm['BGM']) {
        AudioManager.playBgm({
            name: bgm['BGM'],
            volume: bgm['Volume'] || 90,
            pan: bgm['Pan'] || 0,
            pitch: bgm['Pitch'] || 100
        });
    }
};

// get methods

Scene_SelectLanguage.prototype._getFlagAnimation = function(sprite) {
    const options = this._styleOptions['Flag Animation']
    const repeatTime = options['Duration'];
    const animation = new DKTools.Animation({
        type: 'update',
        repeatTime
    });

    animation.addAction(DKTools.Animation.Action.Scale({
        target: sprite,
        startTime: 0,
        endTime: repeatTime / 2,
        data: new Point(options['Min Scale'], options['Min Scale'])
    }));

    animation.addAction(DKTools.Animation.Action.Scale({
        target: sprite,
        startTime: repeatTime / 2,
        endTime: repeatTime,
        data: new Point(options['Max Scale'], options['Max Scale'])
    }));

    return animation;
};

// handler methods

Scene_SelectLanguage.prototype.onLanguageOk = function() {
    if (this._style === 'Window') {
        DKTools.Localization.selectLocale(this._languageWindow.currentExt());
    } else {
        DKTools.Localization.selectLocale(this._locales[this._index]);
    }

    this.fadeOutAll();
    this.popScene();
};

Scene_SelectLanguage.prototype.onLanguageCancel = function() {
    this.fadeOutAll();
    this.popScene();
};

Scene_SelectLanguage.prototype.popScene = function() {
    if (this._nextScene) {
        SceneManager.goto(this._nextScene);
    } else {
        DKTools.Scene.prototype.popScene.apply(this, arguments);
    }
};

Scene_SelectLanguage.prototype.selectFlag = function(index) {
    this._index = index;

    if (this._helpWindow) {
        this._helpWindow.refreshAll();
    }

    if (this._languageNameWindow) {
        this._languageNameWindow.refreshAll();
    }

    this.refreshBackground(this._locales[index]);
    this.refreshForeground(this._locales[index]);
    this.updateFlagsPlacement();
};

Scene_SelectLanguage.prototype.refreshBackground = function(locale) {
    if (this._background) {
        const filename = LocalizationParam.get('Background Filename');

        DKTools.Utils.Bitmap.load({
            folder: DKTools.Localization.getImageFolder(
                'img/system/', filename, locale),
            filename,
            listener: (bitmap) => {
                this._background.setBitmap(bitmap);
            }
        });
    }
};

Scene_SelectLanguage.prototype.refreshForeground = function(locale) {
    if (this._foreground) {
        const filename = LocalizationParam.get('Foreground Filename');

        DKTools.Utils.Bitmap.load({
            folder: DKTools.Localization.getImageFolder(
                'img/system/', filename, locale),
            filename,
            listener: (bitmap) => {
                this._foreground.setBitmap(bitmap);
            }
        });
    }
};

Scene_SelectLanguage.prototype.updateFlagsPlacement = function() {
    this._flagSprites.forEach(sprite => sprite.hide());

    const animationOptions = this._styleOptions['Flag Animation'] || {};
    const central = this._flagSprites[this._index];
    const scale = new Point(
        this._styleOptions['Side Flags']['Scale'], this._styleOptions['Side Flags']['Scale']);
    const opacity = this._styleOptions['Side Flags']['Opacity'];

    central.show(true);
    central.scale.set(1, 1);
    central.opacity = 255;
    central.move(Graphics.boxWidth / 2, Graphics.boxHeight / 2);

    if (animationOptions['Enabled']) {
        if (this._animation) {
            this._animation.finish(true);
        }

        this._animation = this._getFlagAnimation(central);
        this._eventsManager.addAnimation(this._animation);
    }

    let showLeft = false;
    let showRight = false;

    if (this._styleOptions['Loop Scroll'] && this._locales.length > 2) {
        showLeft = true;
        showRight = true;
    } else if (this._index === 0) {
        showRight = true;
    } else if (this._index === DKTools.Localization.locales.length - 1) {
        showLeft = true;
    } else {
        showLeft = true;
        showRight = true;
    }

    if (showLeft) {
        let left = this._flagSprites[this._index - 1];

        if (!left && this._styleOptions['Loop Scroll'] && this._locales.length > 2) {
            left = this._flagSprites[this._locales.length - 1];
        }

        if (left) {
            left.show(true);

            left.scale.copy(scale);
            left.opacity = opacity;

            const x = eval(this._styleOptions['Side Flags']['Left Flag X']);
            const y = Graphics.boxHeight / 2;

            left.move(x, y);
        }
    }

    if (showRight) {
        let right = this._flagSprites[this._index + 1];

        if (!right && this._styleOptions['Loop Scroll'] && this._locales.length > 2) {
            right = this._flagSprites[0];
        }

        if (right) {
            right.show(true);

            right.scale.copy(scale);
            right.opacity = opacity;

            const x = eval(this._styleOptions['Side Flags']['Right Flag X']);
            const y = Graphics.boxHeight / 2;

            right.move(x, y);
        }
    }
};

Scene_SelectLanguage.prototype.updateFlagsInput = function() {
    if (this._style === 'Window') {
        return;
    }

    const scrollRight = (Input.isRepeated('right')
        || this._styleOptions['Mouse Scroll'] && TouchInput.wheelY > 0)
        && (this._index < DKTools.Localization.locales.length - 1 || this._styleOptions['Loop Scroll']);

    const scrollLeft = (Input.isRepeated('left') ||
        this._styleOptions['Mouse Scroll'] && TouchInput.wheelY < 0)
        && (this._index > 0 || this._styleOptions['Loop Scroll']);

    if (scrollRight) {
        if (this._styleOptions['Play Cursor Sound']) {
            SoundManager.playCursor();
        }

        if (this._index + 1 < this._locales.length) {
            this.selectFlag(this._index + 1);
        } else {
            this.selectFlag(0);
        }
    } else if (scrollLeft) {
        if (this._styleOptions['Play Cursor Sound']) {
            SoundManager.playCursor();
        }

        if (this._index > 0) {
            this.selectFlag(this._index - 1);
        } else {
            this.selectFlag(this._locales.length - 1);
        }
    } else if (Input.isTriggered('ok')) {
        if (this._styleOptions['Play Ok Sound']) {
            SoundManager.playOk();
        }

        this.onLanguageOk();
    } else if (!this._options.firstLaunch && (Input.isTriggered('cancel') || TouchInput.isCancelled())) {
        if (this._styleOptions['Play Cancel Sound']) {
            SoundManager.playCancel();
        }

        this.onLanguageCancel();
    }
};

Scene_SelectLanguage.prototype.update = function() {
    DKTools.Scene.prototype.update.apply(this, arguments);

    if (!this.isBusy()) {
        this.updateFlagsInput();
    }
};

//===========================================================================
// Compatibility with other plugins
//===========================================================================

if (Imported['YEP_MessageCore']) {

    Game_System.prototype.initMessageFontSettings = function() {
        if (this.isChinese()) {
            this._msgFontName = Yanfly.Param.MSGCNFontName;
        } else if (this.isKorean()) {
            this._msgFontName = Yanfly.Param.MSGKRFontName;
        } else {
            this._msgFontName = Yanfly.Param.MSGFontName;
        }

        this._msgFontSize = Yanfly.Param.MSGFontSize;
        this._msgFontOutline = Yanfly.Param.MSGFontOutline;
    };

    DKTools.Localization.addChangeLocaleListener(() => {
        $gameSystem.initMessageFontSettings();
    });

}

if (Imported['YEP_QuestJournal']) {

    const Localization_Window_QuestData_drawQuestTextEx = Window_QuestData.prototype.drawQuestTextEx;
    Window_QuestData.prototype.drawQuestTextEx = function(text, x, y) {
        text = DKTools.Localization.getText(text);

        return Localization_Window_QuestData_drawQuestTextEx.call(this, text, x, y);
    };

}
