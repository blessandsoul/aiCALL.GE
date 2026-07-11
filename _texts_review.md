# aicall.ge, text review

**For the translator.** Edit the **KA** and **RU** columns only. Leave the KEY column alone.

Rules that will break the site if you ignore them:

- **No long dash and no middle dash.** Not one, anywhere. Use a comma, a period, a colon,
  parentheses, or a plain hyphen. A validator blocks the file otherwise.
- **Keep every placeholder exactly as it is.** `{year}` stays `{year}`. `<brand></brand>` stays
  `<brand></brand>` (it renders the product logo inline, so do not translate it and do not
  delete it).
- **Georgian is Mkhedruli**, never Mtavruli and never uppercase.
- **Never put a Cyrillic letter inside a Georgian word.** They look alike and it corrupts search.
- `typewriterWords` is a comma-separated list with **no space after the comma**, and
  `typewriterPrefill` must be **the first word of that list**.
- Keep the length roughly in the same range as the English. These are laid out in fixed boxes,
  and a heading that doubles in length will wrap into three lines.

Where this text lives, if you would rather edit the source directly:
`aicall.ge_project/src/messages/{ka,en,ru}.json`

---


| KEY | EN | KA | RU |
| --- | --- | --- | --- |
| `seo.contact.title` | Contact aiCALL | კონტაქტი, aiCALL | Контакты, aiCALL |
| `seo.contact.description` | Talk to us about calling your own booked customers in Georgian. Clinics, dental, service centres, salons, delivery. | დაგვიკავშირდით, თუ გსურთ, რომ თქვენს ჩაწერილ კლიენტებს ქართულად ხმოვანმა აგენტმა დაურეკოს. კლინიკები, სტომატოლოგია, სერვისცენტრები, სალონები, მიწოდება. | Свяжитесь с нами, если хотите, чтобы голосовой агент обзванивал ваших записанных клиентов на грузинском. Клиники, стоматология, сервис-центры, салоны, доставка. |
| `seo.notFound.title` | 404, page not found | 404, გვერდი ვერ მოიძებნა | 404, страница не найдена |
| `seo.notFound.description` | This page does not exist. Go back to the homepage. | ეს გვერდი არ არსებობს. დაბრუნდით მთავარ გვერდზე. | Эта страница не существует. Вернитесь на главную страницу. |
| `seo.notFound.heading` | Page not found | გვერდი ვერ მოიძებნა | Страница не найдена |
| `seo.notFound.body` | This page does not exist, or it has moved. | ეს გვერდი არ არსებობს ან გადატანილია. | Эта страница не существует или была перемещена. |
| `seo.notFound.backHome` | Back to the homepage | მთავარ გვერდზე | На главную |
| `contact.title` | Contact us | დაგვიკავშირდით | Свяжитесь с нами |
| `contact.subtitle` | Leave your number and we will call you back. | დატოვეთ ნომერი და ჩვენ დაგირეკავთ. | Оставьте номер, и мы вам перезвоним. |
| `contact.phone` | Phone number | ტელეფონის ნომერი | Номер телефона |
| `contact.phonePlaceholder` | +995 5XX XXX XXX | +995 5XX XXX XXX | +995 5XX XXX XXX |
| `contact.submit` | Send | გაგზავნა | Отправить |
| `contact.submitting` | Sending... | იგზავნება... | Отправка... |
| `contact.successTitle` | Received | მიღებულია | Принято |
| `contact.successMessage` | We will call you back shortly. | მალე დაგირეკავთ. | Мы скоро перезвоним вам. |
| `contact.errorMessage` | Something went wrong. Please try again. | დაფიქსირდა შეცდომა. გთხოვთ, სცადოთ თავიდან. | Что-то пошло не так. Пожалуйста, попробуйте еще раз. |
| `contact.contactInfo` | Contact information | საკონტაქტო ინფორმაცია | Контактная информация |
| `contact.phoneLabel` | Phone | ტელეფონი | Телефон |
| `contact.emailLabel` | Email | ელფოსტა | Почта |
| `contact.officeLabel` | Office | ოფისი | Офис |
| `contact.office` | Tbilisi, Tornike Eristavi St. 3 | თბილისი, თორნიკე ერისთავის ქ. 3 | Тбилиси, ул. Торнике Эриставе 3 |
| `contact.legalLabel` | Registered address | იურიდიული მისამართი | Юридический адрес |
| `contact.legal` | Zemo Plato, III Array, N14, Apt. 87, Tbilisi 0163 | ზემო პლატო, III მასივი, N14, ბინა 87, თბილისი 0163 | Земо Плато, III массив, N14, кв. 87, Тбилиси 0163 |
| `landingNav.showcase` | How it sounds | როგორ ჟღერს | Как звучит |
| `landingNav.process` | How it works | როგორ მუშაობს | Как работает |
| `landingNav.faq` | Questions | კითხვები | Вопросы |
| `landingNav.cta` | Get in touch | დაგვიკავშირდით | Связаться |
| `landingFooter.company` | AI NOW LLC, Tbilisi, Georgia | შპს AI NOW, თბილისი, საქართველო | ООО AI NOW, Тбилиси, Грузия |
| `landingFooter.familyHeading` | aiNOW family | aiNOW-ის პროდუქტები | Семейство aiNOW |
| `landingFooter.companyHeading` | aiCALL | aiCALL | aiCALL |
| `landingFooter.socialHeading` | Social | სოციალური ქსელები | Соцсети |
| `landingFooter.languageHeading` | Language | ენა | Язык |
| `landingFooter.contact` | Contact | კონტაქტი | Контакты |
| `landingFooter.sectionShowcase` | How it sounds | როგორ ჟღერს | Как звучит |
| `landingFooter.sectionWork` | How it works | როგორ მუშაობს | Как работает |
| `landingFooter.sectionFaq` | Questions | კითხვები | Вопросы |
| `landingFooter.ctaHuge` | Try it on a hundred of your own bookings | სცადეთ თქვენსავე ას ჩაწერაზე | Попробуйте на своей же сотне записей |
| `landingFooter.copyright` | © {year} aiCALL, an aiNOW product. All rights reserved. | © {year} aiCALL, aiNOW-ის პროდუქტი. ყველა უფლება დაცულია. | © {year} aiCALL, продукт aiNOW. Все права защищены. |
| `product.seo.title` | aiCALL, the AI voice agent that confirms your bookings in Georgian | aiCALL, ხმოვანი AI აგენტი, რომელიც ქართულად ადასტურებს თქვენს ჩაწერებს | aiCALL, голосовой AI-агент, подтверждающий ваши записи на грузинском |
| `product.seo.description` | It calls your booked customers the day before, confirms or reschedules them, and hands you back a clean outcome sheet. Your own customers only: Georgian law requires written consent for marketing calls. | წინა დღეს ურეკავს თქვენს ჩაწერილ კლიენტებს, ადასტურებს ან გადააქვს ვიზიტი და გიბრუნებთ შედეგების სუფთა ცხრილს. მხოლოდ თქვენივე კლიენტები: პირდაპირი მარკეტინგის ზარებისთვის კანონი წერილობით თანხმობას მოითხოვს. | Накануне обзванивает ваших записанных клиентов, подтверждает или переносит визит и возвращает вам чистую таблицу результатов. Только ваши собственные клиенты: закон Грузии требует письменного согласия на маркетинговые звонки. |
| `product.hero.lead` | Nobody confirms tomorrow's | ვერავინ ადასტურებს ხვალინდელ | Никто не подтверждает завтрашние |
| `product.hero.taglinePrefix` | AI that | AI, რომელიც | AI, который |
| `product.hero.taglineWorks` | calls | რეკავს | обзванивает |
| `product.hero.typewriterWords` | appointments,deliveries,bookings,service visits,payments | ჩაწერებს,მიწოდებებს,ჯავშნებს,ვიზიტებს,გადახდებს | записи,доставки,брони,визиты,платежи |
| `product.hero.typewriterPrefill` | appointments | ჩაწერებს | записи |
| `product.hero.sloganCreates` | creates | ქმნის | создает |
| `product.hero.sloganAds` | advertises | არეკლამებს | рекламирует |
| `product.hero.sloganSells` | sells | ყიდის | продает |
| `product.hero.sloganManages` | manages | მართავს | управляет |
| `product.hero.sloganTogether` | together | ერთად | вместе |
| `product.hero.ctaResults` | Hear it in Georgian | მოისმინეთ ქართულად | Послушать на грузинском |
| `product.hero.ctaCall` | Book a call | დაგვიკავშირდით | Связаться |
| `product.hero.commitment` | First 5 clinics: a 100-call pilot on your own bookings. We measure your answer rate and your confirm rate in Georgian, and the numbers are yours whether you continue with us or not. | პირველი 5 კლინიკა: 100-ზარიანი პილოტი თქვენსავე ჩაწერებზე. ვზომავთ თქვენს პასუხისა და დადასტურების მაჩვენებელს ქართულად, და ეს ციფრები თქვენია, გააგრძელებთ თუ არა. | Первым 5 клиникам: пилот на 100 звонков по вашим же записям. Замеряем ваш процент дозвона и подтверждений на грузинском, и эти цифры остаются вам, продолжите вы с нами или нет. |
| `product.hero.audience` | For clinics, dentists, service centres, salons and delivery | კლინიკებს, სტომატოლოგებს, სერვისცენტრებს, სალონებსა და მიწოდებას | Для клиник, стоматологов, сервис-центров, салонов и доставки |
| `product.hero.sub` | So we call them. In Georgian, the day before, at the hour you pick. They answer in one word, and you get tomorrow's list back with the answers already in it. | ამიტომ ჩვენ ვურეკავთ. ქართულად, წინა დღეს, თქვენს მიერ არჩეულ საათზე. ისინი ერთი სიტყვით პასუხობენ, თქვენ კი ხვალინდელ სიას იღებთ უკვე პასუხებით. | Поэтому звоним мы. На грузинском, накануне, в выбранный вами час. Они отвечают одним словом, а вы получаете завтрашний список уже с ответами. |
| `product.hero.signedBy` | Andrew Altair. I am the one who calls you back. | ენდრიუ ალტაირი. უკან მე დაგირეკავთ. | Эндрю Алтаир. Перезванивать вам буду я. |
| `product.work.eyebrow` | How it works | როგორ მუშაობს | Как это работает |
| `product.work.headingPre` | Six steps. | ექვსი ნაბიჯი. | Шесть шагов. |
| `product.work.headingAccent` | From tomorrow's list to a sheet you can act on. | ხვალინდელი სიიდან ცხრილამდე, რომლითაც შეგიძლიათ იმოქმედოთ. | От завтрашнего списка до таблицы, с которой можно работать. |
| `product.work.s1Title` | You send tomorrow's list | გვიგზავნით ხვალინდელ სიას | Вы присылаете завтрашний список |
| `product.work.s1Tag` | a spreadsheet is enough | საკმარისია ცხრილი | достаточно таблицы |
| `product.work.s1Desc` | Names, numbers, times. No CRM, no integration, no IT project. Export it from whatever you already use, even if that is a notebook someone types up at closing time. | სახელები, ნომრები, საათები. არანაირი CRM, ინტეგრაცია და IT-პროექტი. გამოიტანეთ იქიდან, სადაც უკვე გიწერიათ, თუნდაც ეს რვეული იყოს, რომელსაც დახურვის წინ ვინმე კრეფს. | Имена, номера, время. Никакой CRM, никакой интеграции, никакого IT-проекта. Выгрузите откуда угодно, даже если это тетрадь, которую кто-то переписывает перед закрытием. |
| `product.work.s2Title` | We write the script with you | სცენარს ერთად ვწერთ | Сценарий пишем вместе |
| `product.work.s2Tag` | three sentences | სამი წინადადება | три предложения |
| `product.work.s2Desc` | Georgian, short, one question. The agent confirms, reschedules, or hands over to a person. It does not hold a conversation, and that is on purpose. | ქართული, მოკლე, ერთი კითხვა. აგენტი ადასტურებს, გადააქვს ან გადასცემს ადამიანს. საუბარში არ შემოდის და ეს განზრახაა ასე. | Короткий вопрос на грузинском. Агент подтверждает, переносит визит или переводит на оператора. В долгие разговоры не вступает, и это сделано намеренно. |
| `product.work.s3Title` | It calls, the day before | რეკავს წინა დღეს | Звонит накануне |
| `product.work.s3Tag` | at the hour you pick | თქვენ მიერ არჩეულ საათზე | в выбранное вами время |
| `product.work.s3Desc` | It says it is an AI agent in the first sentence, on every call, without exception. Your customer knows who is talking, and that is what keeps you clean. | პირველივე წინადადებაში აცხადებს, რომ AI აგენტია. ყოველ ზარზე, გამონაკლისის გარეშე. კლიენტმა იცის, ვინ ელაპარაკება, და სწორედ ეს გინარჩუნებთ სუფთად. | В первом же предложении говорит, что он AI-агент. На каждом звонке, без исключений. Клиент знает, кто с ним говорит, и именно это держит вас в правовом поле. |
| `product.work.s4Title` | Your customer answers in one word | კლიენტი ერთი სიტყვით პასუხობს | Клиент отвечает одним словом |
| `product.work.s4Tag` | yes, no, a date | დიახ, არა, თარიღი | да, нет, дата |
| `product.work.s4Desc` | Confirm, move it, or ask for a person. A request for a person transfers to your line while the customer is still holding the phone. | დაადასტუროს, გადაიტანოს ან ოპერატორთან დაკავშირება მოითხოვოს. ოპერატორის მოთხოვნის შემთხვევაში ზარი მაშინვე თქვენს ხაზზე გადაერთვება, სანამ კლიენტს ყურმილი უჭირავს. | Подтвердить, перенести или позвать оператора. Запрос оператора сразу переводится на вашу линию, пока клиент еще держит трубку. |
| `product.work.s5Title` | You get the outcome sheet | იღებთ შედეგების ცხრილს | Вы получаете таблицу результатов |
| `product.work.s5Tag` | the same evening | იმავე საღამოს | тем же вечером |
| `product.work.s5Desc` | Confirmed, rescheduled, no answer, wants a human. Four columns you can act on before you open tomorrow. That sheet is what you are actually buying. | დადასტურდა, გადაიტანა, არ უპასუხა, ოპერატორი სურს. ოთხი სვეტი, რომლითაც შეგიძლიათ იმოქმედოთ ხვალ მუშაობის დაწყებამდე. სწორედ ეს ცხრილია ის, რასაც სინამდვილეში ყიდულობთ. | Подтвердил, перенес, не ответил, нужен оператор. Четыре колонки, с которыми можно работать до завтрашнего открытия. Именно эту таблицу вы и покупаете. |
| `product.work.s6Title` | We tune it on your own numbers | ვაწყობთ თქვენივე ციფრებზე | Настраиваем на ваших же цифрах |
| `product.work.s6Tag` | every week | ყოველ კვირას | каждую неделю |
| `product.work.s6Desc` | Answer rate by hour of day, confirm rate by script. Measured on your customers, in Georgian, not borrowed from an American case study. | პასუხების წილი საათების მიხედვით, დადასტურების მაჩვენებელი სცენარის მიხედვით. გაზომილია თქვენს კლიენტებზე, ქართულად, და არა ნასესხები ამერიკული კვლევებიდან. | Доля дозвона по часам, доля подтверждений по сценарию. Замерено на ваших клиентах, на грузинском, а не взято из американских кейсов. |
| `product.faq.headingPre` | Questions, | კითხვები, | Вопросы, |
| `product.faq.headingAccent` | answered straight. | პირდაპირი პასუხებით. | прямые ответы. |
| `product.faq.subtitle` | Including the ones where the answer is no. | მათ შორის ისეთებზეც, სადაც პასუხი უარყოფითია. | В том числе те, на которые ответ отрицательный. |
| `product.faq.q1` | Will <brand></brand> speak proper Georgian, or will it sound like a robot? | მართლა გამართული ქართულით ილაპარაკებს <brand></brand> თუ რობოტივით იჟღერებს? | <brand></brand> действительно заговорит на хорошем грузинском или будет звучать как робот? |
| `product.faq.a1` | The voice is good, and you can hear it for yourself at the top of this page. The listening side is the honest limit: the best public Georgian speech recognition still gets roughly one word in nine wrong. That works when the answer is yes, no, a date or a number. It falls apart in open conversation. So we built the call around confirmation rather than conversation, and we would rather tell you now than let you find out on your customers. | ხმა კარგია, ამაში გვერდის თავში თავად დარწმუნდებით. თუმცა, რეალური სირთულე მეტყველების ამოცნობაშია: ქართული ენის ამოცნობის საუკეთესო სისტემებიც კი ყოველ მეცხრე სიტყვაში ცდებიან. ეს მუშაობს, როცა პასუხია „დიახ“, „არა“, თარიღი ან რიცხვი, მაგრამ თავისუფალი საუბრისას ყველაფერი იშლება. ამიტომ, ზარი დადასტურებაზე ავაგეთ და არა საუბრებზე. გვირჩევნია ეს ახლავე გითხრათ, ვიდრე თქვენს კლიენტებზე ჩაატაროთ ექსპერიმენტები. | Голос отличный, вы можете послушать его вверху этой страницы. Но есть честное ограничение по распознаванию речи: лучшие публичные системы распознавания грузинского языка всё ещё ошибаются примерно в одном слове из девяти. Это нормально работает, когда ответ короткий (да, нет, дата или число). Но в свободном диалоге система ломается. Поэтому мы построили звонок вокруг подтверждения, а не разговора. И мы предпочитаем сказать об этом сразу, а не тестировать это на ваших клиентах. |
| `product.faq.q2` | Will my customers realise it is a machine, and do we have to tell them? | მიხვდებიან თუ არა კლიენტები, რომ მანქანა ელაპარაკებათ და ვართ თუ არა ვალდებულები, გავაფრთხილოთ ისინი? | Поймут ли клиенты, что это машина, и обязаны ли мы их предупреждать? |
| `product.faq.a2` | They will, and yes. The agent says it is an AI agent in the first sentence of every call. The EU AI Act makes that disclosure mandatory from August 2026 and Georgia is moving the same way. A clinic that hides it is buying a problem. People mind far less than owners expect when the call is short and useful. | დიახ, მიხვდებიან და გაფრთხილებაც აუცილებელია. ყოველი ზარის პირველივე წინადადებაში აგენტი აცხადებს, რომ ის ხელოვნური ინტელექტია. ევროკავშირის ხელოვნური ინტელექტის აქტი (AI Act) ამ ინფორმაციის გამჟღავნებას 2026 წლის აგვისტოდან სავალდებულოს ხდის, საქართველოც იმავე გზას ადგას. კლინიკა, რომელიც ამას მალავს, თავადვე იქმნის პრობლემებს. კლიენტებს ეს ბევრად ნაკლებად აწუხებთ, ვიდრე მფლობელებს ჰგონიათ, თუკი ზარი მოკლე და სასარგებლოა. | Поймут, и да, вы обязаны их предупредить. Агент в первом же предложении каждого звонка говорит, что он является AI-агентом. Закон ЕС об искусственном интеллекте (AI Act) делает такое раскрытие обязательным с августа 2026 года, и Грузия движется в том же направлении. Клиника, которая скрывает этот факт, сама создает себе проблемы. Людей это задевает гораздо меньше, чем кажется владельцам бизнеса, если звонок короткий и полезный. |
| `product.faq.q3` | Can I give you a list of numbers I bought and have you call them? | შემიძლია თუ არა გადმოგცეთ ნაყიდი ნომრების ბაზა და მათზე დარეკვა დავუკვეთო? | Можно ли дать вам купленную базу номеров и обзвонить её? |
| `product.faq.a3` | No. The Georgian personal data law requires written consent for direct marketing, with no exceptions, and opt-outs must be honoured within seven working days. A bought list has neither. Anyone who offers to cold-call it for you is selling you a violation and keeping the fee. | არა. „პერსონალურ მონაცემთა დაცვის შესახებ“ საქართველოს კანონი პირდაპირი მარკეტინგისთვის წერილობით თანხმობას მოითხოვს, ყოველგვარი გამონაკლისის გარეშე, ხოლო უარის თქმის მოთხოვნა 7 სამუშაო დღეში უნდა დაკმაყოფილდეს. ნაყიდ სიას არც ერთი გააჩნია და არც მეორე. ვინც ასეთი ბაზების „ცივ დარეკვას“ გთავაზობთ, კანონდარღვევაში გხვევთ და მომსახურების საფასურს მაინც თავისთვის იტოვებს. | Нет. Закон Грузии о защите персональных данных требует письменного согласия на прямой маркетинг без каких-либо исключений, а отказ от рассылок должен быть обработан в течение 7 рабочих дней. У купленной базы нет ни того, ни другого. Любой, кто предлагает вам холодный обзвон по такой базе, втягивает вас в нарушение закона, но заберет свои деньги в любом случае. |
| `product.faq.q4` | Then what is actually allowed? | მაშ რა არის კანონით ნებადართული? | Что в таком случае разрешено? |
| `product.faq.a4` | Calling the people who already have a relationship with you, about that relationship. Confirming an appointment they made. Confirming a delivery they ordered. Reminding them of a payment on a contract they signed. That is performance of an agreement, and it does not walk into the written-consent wall. Selling something new to someone who never asked needs their written consent first, and we will help you collect it properly. | დარეკვა მხოლოდ იმ ადამიანებთანაა ნებადართული, ვისთანაც უკვე გაქვთ საქმიანი კავშირი, და თანაც მხოლოდ ამ კავშირის ფარგლებში: მათ მიერ დაჯავშნილი ვიზიტის დადასტურება, შეკვეთილი გზავნილის მიწოდება ან გაფორმებული ხელშეკრულებით გათვალისწინებული გადახდის შეხსენება. ეს ხელშეკრულების პირობების შესრულებაა და წერილობითი თანხმობის მოთხოვნას არ ეჯახება. ხოლო ახალი სერვისის მიყიდვა იმ ადამიანისთვის, ვისაც ეს არ უთხოვია, წინასწარ წერილობით თანხმობას საჭიროებს. ჩვენ დაგეხმარებით ამ თანხმობის სწორად გაფორმებაში. | Звонить тем, с кем у вас уже есть деловые отношения, и только по поводу этих отношений: подтвердить запись на прием, доставку заказа или напомнить о платеже по подписанному договору. Это является исполнением обязательств и не требует предварительного письменного согласия. Продажа чего-то нового тому, кто об этом не просил, требует письменного согласия, и мы поможем вам настроить его сбор по всем правилам. |
| `product.faq.q5` | What happens when the customer asks something the agent does not know? | რა ხდება, როდესაც კლიენტი სვამს კითხვას, რომელზეც აგენტს პასუხი არ აქვს? | Что происходит, когда клиент спрашивает то, чего агент не знает? |
| `product.faq.a5` | It stops trying. It says a person will handle this, then either transfers the call to your line right away or marks the row so you call back. An agent that guesses in front of your patient is worse than no agent, so ours is built to give up early. | აგენტი მაშინვე წყვეტს მცდელობას. კლიენტს ეუბნება, რომ საკითხს ოპერატორი მოაგვარებს, რის შემდეგაც ზარს მაშინვე თქვენს ხაზზე გადაამისამართებს ან მონიშნავს ველს, რომ თავად გადაურეკოთ. აგენტი, რომელიც პაციენტთან საუბრისას პასუხების გამოცნობას დაიწყებს, უფრო მეტ ზიანს მოიტანს, ვიდრე სარგებელს. ამიტომ, ჩვენი სისტემა ისეა მოწყობილი, რომ რთულ სიტუაციაში ზარი ოპერატორს გადააბაროს. | Агент сразу прекращает попытки ответить. Он сообщает, что вопросом займется человек, и либо мгновенно переводит звонок на вашу линию, либо помечает строку в таблице для вашего обратного звонка. Агент, который начинает гадать и придумывать ответы перед вашим пациентом, хуже, чем отсутствие агента. Поэтому наш робот настроен так, чтобы вовремя передавать инициативу человеку. |
| `product.faq.q6` | Can it transfer to a real person? | შეუძლია თუ არა აგენტს ზარის ოპერატორზე გადართვა? | Может ли он перевести звонок на живого оператора? |
| `product.faq.a6` | Yes, mid-call, to the number you give us. Anyone who asks for a human gets one. | დიახ, ზარის დროს, თქვენ მიერ მითითებულ ნომერზე. ნებისმიერი კლიენტი, რომელიც ოპერატორთან გადართვას ითხოვს, მაშინვე უკავშირდება მას. | Да, прямо во время разговора, на указанный вами номер. Любого, кто попросит связать с человеком, сразу переключат на оператора. |
| `product.faq.q7` | What does it cost? | რა ღირს ეს მომსახურება? | Сколько это стоит? |
| `product.faq.a7` | We quote per campaign, once we know how many people you are calling and how long the calls run. There is no price list on this page on purpose: a hundred confirmations for one dentist and four thousand delivery calls for a distributor are not the same product. Send us the size of the list and you get a number the same day. | ტარიფი ინდივიდუალურია ყოველი კამპანიისთვის: ფასი დგინდება მას შემდეგ, რაც გავიგებთ ბაზის მოცულობას და ზარების ხანგრძლივობას. ამ გვერდზე ფასების ცხრილი განზრახ არ დევს, რადგან ასი ვიზიტის დადასტურება სტომატოლოგისთვის და ოთხი ათასი ზარი მიწოდების სამსახურისთვის სრულიად განსხვავებული სერვისია. გამოგვიგზავნეთ თქვენი ბაზის ზომა და ფასს იმავე დღეს შემოგთავაზებთ. | Мы рассчитываем стоимость индивидуально для каждой кампании, когда понимаем размер базы для обзвона и среднюю длительность звонков. На этой странице нет фиксированного прайса, ведь сто подтверждений для стоматологии и четыре тысячи звонков для службы доставки представляют собой совершенно разные продукты. Отправьте нам размер вашей базы, и мы назовем стоимость в тот же день. |
| `product.faq.q8` | How fast can we go live? | რამდენ ხანში შევძლებთ სისტემის გაშვებას? | Как быстро можно запуститься? |
| `product.faq.a8` | Days, not months. The first campaign needs your list, one script we write together, and a number to transfer to. There is nothing to install and nothing for your staff to learn. | ამას დასჭირდება რამდენიმე დღე და არა თვეები. პირველი კამპანიის გასაშვებად საჭიროა მხოლოდ კლიენტების სია, ჩვენ მიერ ერთობლივად დაწერილი მოკლე სცენარი და გადასამართებელი ტელეფონის ნომერი. თქვენს კომპიუტერებში არაფრის ინსტალაცია არ გჭირდებათ, თანამშრომლებს კი შესასწავლი არაფერი ექნებათ. | За несколько дней, это не растянется на месяцы. Для запуска первой кампании понадобятся только ваша база контактов, короткий сценарий (мы напишем его вместе) и номер для перевода звонков. Вам не нужно ничего устанавливать, а вашим сотрудникам не придется ничему учиться. |
| `product.faq.q9` | What if nobody answers? | რა ხდება, თუ ზარს არავინ პასუხობს? | Что если никто не отвечает на звонок? |
| `product.faq.a9` | It retries on the schedule you set, and after the last attempt the row lands in the no-answer column so a human decides what to do. It does not call the same person all evening. | აგენტი განმეორებით დარეკავს თქვენ მიერ შერჩეული გრაფიკით. ბოლო მცდელობის შემდეგ კი ჩანაწერი გადავა სვეტში „არ უპასუხა“, რათა შემდგომი ნაბიჯი თქვენმა თანამშრომელმა გადაწყვიტოს. სისტემა ერთსა და იმავე ადამიანს მთელი საღამო არ შეაწუხებს. | Робот сделает повторные звонки по настроенному вами расписанию. Если дозвониться не удастся, контакт перейдет в колонку без ответа, чтобы ваш администратор сам решил, что делать дальше. Робот не станет названивать одному и тому же человеку весь вечер. |
| `product.faq.q10` | Does it work with my calendar, or only with an Excel file? | ინტეგრირდება თუ არა სისტემა ჩემს კალენდართან, თუ მუშაობა მხოლოდ Excel-ის ფაილითაა შესაძლებელი? | Интегрируется ли система с моим календарем или работает только через Excel? |
| `product.faq.a10` | An Excel file works. A Google Sheet works. If you already run a booking system we can read from it, but we will look at yours before we promise anything, because every clinic here runs something slightly different. | Excel და Google Sheets ჩვეულებრივად მუშაობს. თუ უკვე გაქვთ ჯავშნების მართვის საკუთარი პროგრამა, შეგვიძლია მონაცემები იქიდანაც წავიკითხოთ. თუმცა, წინასწარ უნდა შევისწავლოთ თქვენი პროგრამა, სანამ რაიმეს დაგპირდებით, რადგან საქართველოში თითქმის ყველა კლინიკა განსხვავებულ სისტემას იყენებს. | Подходят и Excel, и Google Таблицы. Если вы используете готовую систему записи, мы можем настроить импорт данных из нее. Однако нам нужно изучить вашу систему, прежде чем что-то обещать, так как у каждой клиники здесь все устроено немного по-своему. |
| `product.faq.q11` | Can it call in Russian and English too? | შეუძლია თუ არა აგენტს რუსულად და ინგლისურად დარეკვაც? | Может ли робот звонить также на русском и английском? |
| `product.faq.a11` | Yes, and the recognition is stronger in both than it is in Georgian. Georgian is the hard one, and it is the one the whole product is designed around. | დიახ, თანაც ამ ენებზე მეტყველების ამოცნობა ბევრად უფრო ზუსტია, ვიდრე ქართულში. ქართული ენა ამ მხრივ ყველაზე რთული გამოწვევაა და მთელი ჩვენი ტექნოლოგიური პროდუქტი სწორედ ამ გამოწვევის გარშემო შეიქმნა. | Да, причем распознавание на этих языках работает еще точнее, чем на грузинском. Грузинский язык является самым сложным случаем, и весь наш продукт создавался специально под него. |
| `product.faq.q12` | What share of people actually pick up? | საშუალოდ ზარების რამდენი პროცენტია წარმატებული? | Какой процент клиентов реально отвечает на звонок? |
| `product.faq.a12` | We do not know yet, on Georgian numbers, and we will not borrow an American figure and pass it off as ours. That is what the first campaign is for. It is the cheapest way to find out, and afterwards the number belongs to you. | ქართულ ნომრებზე ზუსტი სტატისტიკა ჯერ არ გვაქვს. ჩვენ არ ვაპირებთ ამერიკული მონაცემების გადმოკოპირებას და მათ ჩვენებურად გასაღებას. პირველი სატესტო კამპანია სწორედ ამ მაჩვენებლის დასადგენადაა საჭირო. ეს ყველაზე იაფი გზაა რეალური სურათის დასანახად, მიღებული მონაცემები კი მხოლოდ თქვენი ბიზნესისთვის იქნება ხელმისაწვდომი. | У нас пока нет точных данных по грузинским номерам, а выдавать американскую статистику за свою мы не хотим. Для этого и нужна первая кампания. Это самый бюджетный способ узнать реальные цифры конкретно для вашего бизнеса. |
| `product.faq.q13` | Can it chase overdue payments? | შეუძლია თუ არა სისტემას ვადაგადაცილებული გადახდების შეხსენება? | Может ли он напоминать о просроченных платежах? |
| `product.faq.a13` | On an existing contract, yes, and that is where the money in this product tends to sit. It reminds, it states the amount and the date, and it hands off to a person the moment the conversation stops being a reminder. It never takes a card over the phone. | მოქმედი ხელშეკრულებების ფარგლებში ეს შესაძლებელია და სწორედ ამ მიმართულებას მოაქვს ყველაზე დიდი ფინანსური სარგებელი. აგენტი მომხმარებელს ახსენებს გადახდას, უთითებს ზუსტ თანხასა და თარიღს, ხოლო თუ საუბარი უბრალო შეხსენებას გასცდება, ზარს მაშინვე ოპერატორს გადააბარებს. სისტემა ტელეფონით საბანკო ბარათის მონაცემებს არასდროს ითხოვს. | По действующему договору да, и обычно именно эта функция приносит компаниям больше всего выгоды. Робот напоминает о платеже, называет сумму и дату, но переводит звонок на сотрудника в ту же секунду, когда диалог выходит за рамки простого напоминания. Робот никогда не принимает данные карт по телефону. |
| `product.faq.q14` | aiCALL, aiSTAFF, aiOFFICE. Which one do I need? | aiCALL, aiSTAFF, aiOFFICE. რომელი მათგანი გჭირდებათ? | aiCALL, aiSTAFF, aiOFFICE. Что из этого вам нужно? |
| `product.faq.a14` | aiCALL is the phone. If you want an agent that answers your customers on Messenger, Instagram and Viber, that is aiSTAFF.ge. If you want the paperwork inside your company automated, the orders and documents and approvals, that is aiOFFICE.ge. Most owners start with whichever one is bleeding. | aiCALL არის სატელეფონო ზარები. თუ გჭირდებათ აგენტი, რომელიც თქვენს მომხმარებლებს Messenger-ში, Instagram-სა და Viber-ში უპასუხებს, ეს არის aiSTAFF.ge. თუ გსურთ კომპანიის შიდა დოკუმენტაციის, შეკვეთებისა და დამტკიცების პროცესების ავტომატიზაცია, ეს არის aiOFFICE.ge. ბიზნესის მფლობელები, როგორც წესი, იწყებენ იქიდან, სადაც ყველაზე მეტად უჭირთ. | aiCALL отвечает за телефонные звонки. Если вам нужен чат-бот, который отвечает клиентам в Messenger, Instagram и Viber, выбирайте aiSTAFF.ge. Если хотите автоматизировать внутренний документооборот компании (заказы, документы, согласования), вам подойдет aiOFFICE.ge. Обычно владельцы бизнеса начинают с того направления, которое требует самого срочного решения. |
| `product.cta.heading` | Try it on a hundred of your own bookings | სცადეთ თქვენსავე ას ჩაწერაზე | Попробуйте на своей же сотне записей |
| `product.cta.subtitle` | Leave your number. We will call you, in Georgian, with the agent, so you hear exactly what your customer would hear. | დატოვეთ ნომერი. ზუსტად იმავე აგენტით დაგირეკავთ ქართულად, რომ მოისმინოთ ის, რასაც თქვენი კლიენტი მოისმენს. | Оставьте номер. Мы позвоним вам на грузинском через нашего агента, чтобы вы услышали ровно то, что услышит ваш клиент. |
| `product.cta.phoneLabel` | Phone number | ტელეფონის ნომერი | Номер телефона |
| `product.cta.phoneSubmit` | Call me | დამირეკეთ | Позвоните мне |
| `product.cta.phoneNote` | We call back within 24 hours | დაგირეკავთ 24 საათის განმავლობაში | Мы перезвоним вам в течение 24 часов |
| `product.cta.orWrite` | Or write to us: | ან მოგვწერეთ: | Или напишите нам: |
| `product.wordmark.line` | The chair does not stay empty. | სკამი ცარიელი აღარ რჩება. | Кресло больше не пустует. |
| `product.hear.eyebrow` | How it sounds | როგორ ჟღერს | Как звучит |
| `product.hear.heading` | Hear it, in Georgian. | მოისმინეთ ქართულად. | Послушайте на грузинском. |
| `product.hear.subtitle` | Nobody believes Georgian voice AI until they hear it. Pick a call and listen. | ქართულ ხმოვან AI-ს მანამ ვერავინ იჯერებს, სანამ თავად არ მოისმენს. აირჩიეთ ზარი და მოუსმინეთ. | В грузинский голосовой AI никто не верит, пока не услышит сам. Выберите сценарий звонка и послушайте. |
| `product.hear.play` | Play | დაკვრა | Воспроизвести |
| `product.hear.pause` | Pause | პაუზა | Пауза |
| `product.hear.pending` | The recording is being made. The transcript below is the script the agent reads, word for word. | ჩანაწერი მზადდება. ქვემოთ მოცემული ტექსტი ზუსტად ის სცენარია, რომელსაც აგენტი კითხულობს. | Запись готовится. Ниже приведен сценарий, который читает агент, слово в слово. |
| `product.hear.agent` | Agent | აგენტი | Агент |
| `product.hear.customer` | Customer | კლიენტი | Клиент |
| `product.hear.s1Title` | Clinic reminder | შეხსენება კლინიკიდან | Напоминание из клиники |
| `product.hear.s1Sub` | Tomorrow, 14:00, dentist | ხვალ, 14:00, სტომატოლოგი | Завтра, 14:00, стоматолог |
| `product.hear.s2Title` | Delivery confirmation | მიწოდების დადასტურება | Подтверждение доставки |
| `product.hear.s2Sub` | Parcel arriving tomorrow | ამანათი ხვალ მოდის | Посылка придет завтра |
| `product.hear.s3Title` | Payment reminder | გადახდის შეხსენება | Напоминание о платеже |
| `product.hear.s3Sub` | Instalment due on Friday | შენატანი პარასკევს | Взнос в пятницу |
| `product.hear.s4Title` | Missed-call callback | პასუხის გარეშე დარჩენილი ზარი | Обратный звонок по пропущенному |
| `product.hear.s4Sub` | You rang, nobody picked up | დარეკეთ, არავინ უპასუხა | Вы звонили, никто не взял трубку |
| `product.consent.eyebrow` | Before we call anyone | სანამ ვინმეს დავურეკავთ | Прежде чем кому-то звонить |
| `product.consent.heading` | Can we legally call this list? | კანონიერად შეგვიძლია ამ სიაზე დარეკვა? | Вправе ли мы звонить по этому списку? |
| `product.consent.subtitle` | Three questions. We would rather lose the job than hand you a fine. | სამი კითხვა. გვირჩევნია სამუშაო დავკარგოთ, ვიდრე ჯარიმა მიიღოთ. | Три вопроса. Нам проще потерять заказ, чем принести вам штраф. |
| `product.consent.q1` | Are these your own customers? | ესენი თქვენივე კლიენტები არიან? | Это ваши собственные клиенты? |
| `product.consent.q1yes` | Yes, they booked or bought from us | დიახ, ჩაეწერნენ ან იყიდეს ჩვენთან | Да, они записались или покупали у нас |
| `product.consent.q1no` | No, we bought or scraped the list | არა, სია ვიყიდეთ ან შევაგროვეთ | Нет, список куплен или собран |
| `product.consent.q2` | Is the call about something they already have with you? | ზარი იმაზეა, რაც მათ უკვე აქვთ თქვენთან? | Звонок касается их текущих дел с вами? |
| `product.consent.q2yes` | Yes: an appointment, an order, a contract | დიახ: ვიზიტი, შეკვეთა, ხელშეკრულება | Да: визит, заказ или договор |
| `product.consent.q2no` | No, we want to sell them something new | არა, ახლის მიყიდვა გვინდა | Нет, хотим продать им что-то новое |
| `product.consent.q3` | Do you hold their written consent for marketing? | გაქვთ მათი წერილობითი თანხმობა მარკეტინგზე? | У вас есть их письменное согласие на маркетинг? |
| `product.consent.q3yes` | Yes, in writing | დიახ, წერილობით | Да, письменное |
| `product.consent.q3no` | No, or we are not sure | არა, ან დარწმუნებული არ ვართ | Нет, или мы не уверены |
| `product.consent.green` | We can call this list | ამ სიაზე დარეკვა შეგვიძლია | По этому списку звонить можно |
| `product.consent.greenBody` | Your own customers, about something they already have with you. That is performance of an existing relationship, and it is clean. | თქვენივე კლიენტები, იმაზე, რაც მათ უკვე აქვთ თქვენთან. ეს არსებული ურთიერთობის შესრულებაა და სრულიად ლეგალურია. | Ваши собственные клиенты по поводу ваших текущих отношений. Это исполнение существующих обязательств, здесь все чисто. |
| `product.consent.amber` | Operational calls only | მხოლოდ საოპერაციო ზარები | Только операционные звонки |
| `product.consent.amberBody` | We can confirm, remind and reschedule. We cannot sell anything new to this list until you hold written consent. | შეგვიძლია დავადასტუროთ, შევახსენოთ და გადავიტანოთ. ახლის მიყიდვა ამ სიაზე ვერ მოხერხდება, სანამ წერილობით თანხმობას არ აიღებთ. | Мы можем подтверждать, напоминать и переносить записи. Но продавать что-то новое по этому списку нельзя, пока не получите письменное согласие. |
| `product.consent.red` | We cannot call this list | ამ სიაზე ვერ დავრეკავთ | По этому списку звонить нельзя |
| `product.consent.redBody` | Georgian law requires written consent for direct marketing, with no exceptions, and a bought list has none. We will help you collect consent properly, and then we will call. | საქართველოს კანონმდებლობა პირდაპირი მარკეტინგისთვის წერილობით თანხმობას მოითხოვს, ყოველგვარი გამონაკლისის გარეშე. ნაყიდ ბაზას კი ასეთი თანხმობა არ გააჩნია. ჩვენ დაგეხმარებით თანხმობის სწორად გაფორმებაში, რის შემდეგაც შევძლებთ ზარების განხორციელებას. | Закон Грузии требует письменного согласия на прямой маркетинг без каких-либо исключений, а у купленного списка его нет. Мы поможем собрать согласие правильно, и тогда позвоним. |
| `product.consent.law` | Law of Georgia on Personal Data Protection, in force since 1 March 2024. Opt-outs honoured within 7 working days. | საქართველოს კანონი „პერსონალურ მონაცემთა დაცვის შესახებ“, ძალაშია 2024 წლის 1 მარტიდან. უარის თქმის მოთხოვნა სრულდება 7 სამუშაო დღეში. | Закон Грузии «О защите персональных данных», в силе с 1 марта 2024 года. Отказ от рассылок должен быть исполнен в течение 7 рабочих дней. |
| `product.consent.reset` | Start over | თავიდან | Сначала |
| `product.board.eyebrow` | What you are actually buying | რას ყიდულობთ სინამდვილეში | Что вы покупаете на самом деле |
| `product.board.heading` | Not a robot. A sheet you can act on. | არა რობოტი, არამედ ცხრილი, რომლითაც შეგიძლიათ იმოქმედოთ. | Не робота. Таблицу, с которой можно работать. |
| `product.board.subtitle` | A campaign replays below. The numbers are illustrative, not a client result: we have not run a Georgian campaign yet, and we will not invent one. | ქვემოთ ნაჩვენებია კამპანიის სიმულაცია. ციფრები საილუსტრაციოა და არ წარმოადგენს რომელიმე კლიენტის რეალურ შედეგებს: ქართული კამპანია ჯერ არ განგვიხორციელებია და გამოგონილ მონაცემებს არ შემოგთავაზებთ. | Ниже показана симуляция кампании. Цифры здесь лишь для иллюстрации, это не реальный результат клиента: мы еще не проводили кампаний в Грузии и не станем придумывать результаты. |
| `product.board.run` | Run the campaign | კამპანიის გაშვება | Запустить кампанию |
| `product.board.running` | Calling... | რეკავს... | Звоним... |
| `product.board.again` | Run it again | თავიდან გაშვება | Запустить еще раз |
| `product.board.confirmed` | Confirmed | დადასტურდა | Подтвердил |
| `product.board.moved` | Rescheduled | გადაიტანა | Перенес |
| `product.board.noanswer` | No answer | არ უპასუხა | Не ответил |
| `product.board.human` | Wants a human | ოპერატორი სურს | Нужен оператор |
| `product.board.called` | called | დარეკილი | обзвонено |
| `product.board.note` | Simulation. Your real numbers come out of your first campaign. | სიმულაცია. თქვენი რეალური ციფრები პირველი კამპანიიდან მოვა. | Симуляция. Ваши настоящие цифры придут из первой кампании. |
| `product.barge.eyebrow` | The three second difference | სამწამიანი განსხვავება | Разница в три секунды |
| `product.barge.heading` | Interrupt it. That is the whole point. | შეაწყვეტინეთ. სწორედ ეს არის მთავარი. | Перебейте его. В этом весь смысл. |
| `product.barge.subtitle` | A robocall talks over you. Press the button while the agent is speaking. | რობოზარი თქვენზე გადაილაპარაკებს. დააჭირეთ ღილაკს, სანამ აგენტი ლაპარაკობს. | Обычный робозвонок говорит поверх вас. Нажмите кнопку, пока агент говорит. |
| `product.barge.speaking` | Agent is speaking | აგენტი ლაპარაკობს | Агент говорит |
| `product.barge.interrupt` | Interrupt | შეწყვეტინება | Перебить |
| `product.barge.interrupted` | It stopped. Mid-word. | გაჩერდა. სიტყვის შუაში. | Замолчал. На полуслове. |
| `product.barge.busy` | I am busy right now | ახლა დაკავებული ვარ | Я сейчас занят |
| `product.barge.recovery` | Of course. When would suit you better? | რა თქმა უნდა. როდის მოგიხერხდებათ? | Конечно. Когда вам удобнее? |
| `product.barge.note` | A robocall would have finished its sentence. This is the reason an owner stops being embarrassed to call his customers with a machine. | რობოზარი წინადადებას ბოლომდე მაინც იტყოდა. სწორედ ამიტომ აღარ ერიდებათ ბიზნესის მფლობელებს თავიანთ კლიენტებთან ავტომატური სისტემის გამოყენება. | Обычный автоответчик договорил бы фразу до конца. Именно поэтому владельцы бизнеса перестают стесняться использовать автоматику для звонков клиентам. |
| `product.cost.eyebrow` | Your numbers, not ours | თქვენი ციფრები, არა ჩვენი | Ваши цифры, не наши |
| `product.cost.heading` | What does the calling cost you today? | რად გიჯდებათ დარეკვა დღეს? | Во что вам сегодня обходится обзвон? |
| `product.cost.subtitle` | Your inputs, your arithmetic. We are not going to invent a saving for you. | თქვენი მონაცემები, თქვენი არითმეტიკა. დანაზოგს ჩვენ არ მოგიგონებთ. | Ваши данные, ваша арифметика. Экономию мы вам придумывать не станем. |
| `product.cost.contacts` | People to call | დასარეკი კონტაქტების რაოდენობა | Контактов для обзвона |
| `product.cost.minutes` | Minutes per call | ზარის ხანგრძლივობა (წუთი) | Длительность звонка (минут) |
| `product.cost.wage` | What an administrator costs you per hour, GEL | ადმინისტრატორის საათობრივი ანაზღაურება, ლარი | Стоимость часа работы администратора, лари |
| `product.cost.human` | A person does it | ადამიანი აკეთებს | Делает человек |
| `product.cost.agent` | The agent does it | აგენტი აკეთებს | Делает агент |
| `product.cost.hours` | Hours returned to your staff | თანამშრომლებისთვის დაბრუნებული საათები | Часов возвращено сотрудникам |
| `product.cost.perMonth` | per month | თვეში | в месяц |
| `product.cost.note` | The agent figure is our quote for a campaign this size. Everything else here is your own arithmetic. | აგენტის ციფრი ჩვენი შეთავაზებაა ამ ზომის კამპანიაზე. დანარჩენი აქ თქვენივე არითმეტიკაა. | Цифра агента: наша оценка кампании такого размера. Все остальное здесь: ваша собственная арифметика. |
| `product.proof.ringing` | Calling... | რეკავს... | Звоним... |
| `product.proof.speaking` | Speaking | ლაპარაკობს | Говорит |
| `product.proof.done` | Confirmed | დადასტურდა | Подтвердил |
| `product.proof.line0` | Dialing | იძახებს | Набор |
| `product.proof.line1` | გამარჯობა, AI აგენტი ვარ კლინიკიდან. ხვალ ორ საათზე გელოდებით. დაადასტურებთ? | გამარჯობა, AI აგენტი ვარ კლინიკიდან. ხვალ ორ საათზე გელოდებით. დაადასტურებთ? | გამარჯობა, AI აგენტი ვარ კლინიკიდან. ხვალ ორ საათზე გელოდებით. დაადასტურებთ? |
| `product.proof.line2` | დიახ, ვიქნები. | დიახ, ვიქნები. | დიახ, ვიქნები. |
| `product.proof.sheet` | Tomorrow's list | ხვალინდელი სია | Завтрашний список |
| `product.proof.confirmedShort` | confirmed | დადასტურდა | подтвердили |
