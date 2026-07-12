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
| `landingNav.showcase` | Hear the call | მოუსმინეთ ზარს | Послушать звонок |
| `landingNav.process` | How it works | როგორ მუშაობს | Как работает |
| `landingNav.faq` | Questions | კითხვები | Вопросы |
| `landingNav.cta` | Start a pilot | სცადეთ | Попробовать |
| `landingFooter.company` | AI NOW LLC, Tbilisi, Georgia | შპს AI NOW, თბილისი, საქართველო | ООО AI NOW, Тбилиси, Грузия |
| `landingFooter.familyHeading` | aiNOW family | aiNOW-ის პროდუქტები | Семейство aiNOW |
| `landingFooter.companyHeading` | aiCALL | aiCALL | aiCALL |
| `landingFooter.socialHeading` | Social | სოციალური ქსელები | Соцсети |
| `landingFooter.languageHeading` | Language | ენა | Язык |
| `landingFooter.contact` | Contact | კონტაქტი | Контакты |
| `landingFooter.sectionShowcase` | Hear the call | მოუსმინეთ ზარს | Послушать звонок |
| `landingFooter.sectionWork` | How it works | როგორ მუშაობს | Как работает |
| `landingFooter.sectionFaq` | Questions | კითხვები | Вопросы |
| `landingFooter.ctaHuge` | Try it on your bookings | სცადეთ თქვენს ჩაწერებზე | Попробуйте на своих записях |
| `landingFooter.copyright` | © {year} aiCALL, an aiNOW product. All rights reserved. | © {year} aiCALL, aiNOW-ის პროდუქტი. ყველა უფლება დაცულია. | © {year} aiCALL, продукт aiNOW. Все права защищены. |
| `product.seo.title` | aiCALL — Georgian calls that confirm bookings and show the outcome | aiCALL — ქართული ზარები, რომლებიც ჩაწერებს ადასტურებს და შედეგს აჩვენებს | aiCALL — звонки на грузинском с понятным результатом |
| `product.seo.description` | aiCALL calls a business's own customers about existing appointments, deliveries or payments. It asks one short question in Georgian, records the outcome and hands uncertain calls to a person. Direct marketing needs consent regardless of where the contact data came from. | aiCALL-ი თქვენსავე კლიენტებს არსებული ჩაწერის, მიწოდების ან გადახდის შესახებ ურეკავს. აგენტი ქართულად ერთ მოკლე კითხვას სვამს, შედეგს აფიქსირებს და გაურკვეველ საუბარს თანამშრომელს გადასცემს. პირდაპირი მარკეტინგისთვის თანხმობა საჭიროა საკონტაქტო მონაცემების წყაროს მიუხედავად. | aiCALL звонит собственным клиентам компании по поводу действующей записи, доставки или платежа. Агент задаёт короткий вопрос на грузинском, фиксирует результат и передаёт сложный разговор человеку. Для прямого маркетинга согласие нужно независимо от источника контактных данных. |
| `product.hero.lead` | Never miss a | აღარ გამოგრჩეთ | Не пропускайте |
| `product.hero.taglinePrefix` | AI that | AI, რომელიც | AI, который |
| `product.hero.taglineWorks` | calls | რეკავს | звонит |
| `product.hero.typewriterWords` | booking,delivery,service visit,payment,callback | ჩაწერა,მიწოდება,ვიზიტი,გადახდა,ზარი | запись,доставку,визит,платёж,обратный звонок |
| `product.hero.typewriterPrefill` | booking | ჩაწერა | запись |
| `product.hero.ctaResults` | Hear the Georgian question | მოისმინეთ ქართული კითხვა | Послушать вопрос на грузинском |
| `product.hero.ctaCall` | Discuss your call list | განიხილეთ ზარების სია | Обсудить список звонков |
| `product.hero.commitment` | aiNOW checks your list, script, consent basis and human handoff before a campaign starts. You approve the setup and keep the outcome sheet. | aiNOW-ი კამპანიის დაწყებამდე ამოწმებს სიას, სცენარს, ზარის საფუძველსა და თანამშრომელთან გადართვის წესს. თქვენ ამტკიცებთ პარამეტრებს და შედეგების ცხრილი თქვენთან რჩება. | aiNOW проверяет список, сценарий, основание для звонка и передачу человеку до начала кампании. Вы утверждаете настройку и получаете таблицу результатов. |
| `product.hero.audience` | For clinics, service businesses, salons, delivery teams and administrators | კლინიკებისთვის, მომსახურების კომპანიებისთვის, სალონებისთვის, მიწოდების გუნდებისა და ადმინისტრატორებისთვის | Для клиник, сервисных компаний, салонов, служб доставки и администраторов |
| `product.hero.sub` | aiCALL calls your own customers before a booked appointment or delivery, asks a short question in Georgian and marks each response. Missed confirmations become a visible list your team can act on. | aiCALL-ი თქვენსავე კლიენტებს ჩაწერის ან მიწოდების წინ ურეკავს, ქართულად მოკლე კითხვას სვამს და თითოეულ პასუხს აფიქსირებს. გამოტოვებული დადასტურებები ხილულ სამუშაო სიაში ჩნდება. | aiCALL звонит вашим клиентам перед записью или доставкой, задаёт короткий вопрос на грузинском и отмечает каждый ответ. Пропущенные подтверждения превращаются в понятный список действий. |
| `product.hero.signedBy` | aiNOW configures the call, checks the handoff and shows the result before you decide what comes next. | aiNOW-ი ზარს აწყობს, თანამშრომელთან გადართვას ამოწმებს და შედეგს შემდეგ გადაწყვეტილებამდე გაჩვენებთ. | aiNOW настраивает звонок, проверяет передачу оператору и показывает результат до следующего решения. |
| `product.work.eyebrow` | A clear call flow | ზარის გასაგები პროცესი | Понятный порядок звонка |
| `product.work.headingPre` | Six simple steps. | ექვსი მარტივი ნაბიჯი. | Шесть простых шагов. |
| `product.work.headingAccent` | From an approved list to a visible outcome. | შემოწმებული სიიდან ხილულ შედეგამდე. | От проверенного списка к видимому результату. |
| `product.work.s1Title` | Send the customers you already serve | აგზავნით იმ კლიენტების სიას, რომლებსაც უკვე ემსახურებით | Передайте список своих клиентов |
| `product.work.s1Tag` | names, numbers and booking details | სახელები, ნომრები და ჩაწერის დეტალები | имя, номер и данные записи |
| `product.work.s1Desc` | Use the list your team already works with. aiNOW checks that each call concerns an existing appointment, order or agreement before anything starts. | გამოიყენეთ სია, რომლითაც გუნდი უკვე მუშაობს. დაწყებამდე aiNOW-ი ამოწმებს, რომ თითოეული ზარი არსებულ ჩაწერას, შეკვეთას ან ხელშეკრულებას ეხება. | Используйте список, с которым уже работает команда. До запуска aiNOW проверяет, что звонок относится к действующей записи, заказу или договору. |
| `product.work.s2Title` | Approve one short question | ამტკიცებთ ერთ მოკლე კითხვას | Утвердите один короткий вопрос |
| `product.work.s2Tag` | plain Georgian | მარტივი ქართული | простой грузинский язык |
| `product.work.s2Desc` | Set the opening, the confirmation question and the point where a person takes over. The agent follows the approved wording and does not improvise. | განსაზღვრეთ მისალმება, დადასტურების კითხვა და მომენტი, როცა საუბარი თანამშრომელს უნდა გადაეცეს. აგენტი დამტკიცებულ ტექსტს მიჰყვება და პასუხს არ იგონებს. | Определите приветствие, вопрос о подтверждении и момент передачи человеку. Агент следует утверждённому тексту и не импровизирует. |
| `product.work.s3Title` | The customer hears who is calling | კლიენტმა თავიდანვე იცის, ვინ რეკავს | Клиент сразу понимает, кто звонит |
| `product.work.s3Tag` | clear from the first sentence | გასაგებია პირველივე წინადადებიდან | ясно с первой фразы |
| `product.work.s3Desc` | The call identifies the AI agent and your business. The customer hears the purpose before answering the short confirmation question. | ზარის დასაწყისში აგენტი ამბობს, რომ AI აგენტია, და თქვენს კომპანიას ასახელებს. შემდეგ კლიენტი ზარის მიზანსა და მოკლე კითხვას ისმენს. | В начале звонка агент называет себя AI-агентом и указывает вашу компанию. Затем клиент слышит цель и короткий вопрос. |
| `product.work.s4Title` | The customer confirms or asks for help | კლიენტი ადასტურებს ან დახმარებას ითხოვს | Клиент подтверждает или просит помощь |
| `product.work.s4Tag` | yes, another time, or a person | დიახ, სხვა დრო ან თანამშრომელი | да, другое время или человек |
| `product.work.s4Desc` | A clear answer is recorded. A question, objection or request for a person goes to your employee instead of receiving a guessed reply. | მკაფიო პასუხი ფიქსირდება. კითხვა, უარი ან თანამშრომელთან დაკავშირების მოთხოვნა ადამიანს გადაეცემა; აგენტი პასუხს არ იგონებს. | Понятный ответ фиксируется. Вопрос, возражение или просьба соединить с человеком передаётся сотруднику без выдуманного ответа. |
| `product.work.s5Title` | Every outcome appears on one board | ყველა შედეგი ერთ დაფაზე ჩანს | Каждый результат виден на одной доске |
| `product.work.s5Tag` | visible after each call | ყოველი ზარის შემდეგ | после каждого звонка |
| `product.work.s5Desc` | Confirmed, rescheduled, no answer or human follow-up. Your team sees the next action without listening to every call. | დადასტურდა, გადაიდო, პასუხი არ არის ან თანამშრომელია საჭირო. გუნდი შემდეგ ნაბიჯს ხედავს და ყველა ზარის მოსმენა არ სჭირდება. | Подтверждено, перенесено, нет ответа или нужен сотрудник. Команда видит следующий шаг и не переслушивает все звонки. |
| `product.work.s6Title` | Your team keeps control | მართვა თქვენს გუნდთან რჩება | Управление остаётся у команды |
| `product.work.s6Tag` | approve, pause and follow up | დამტკიცება, შეჩერება და გაგრძელება | утвердить, остановить, продолжить |
| `product.work.s6Desc` | Your team approves the list and script, handles exceptions and decides what happens after the outcome is recorded. | გუნდი ამტკიცებს სიასა და სცენარს, გამონაკლისებს ამუშავებს და შედეგის დაფიქსირების შემდეგ მოქმედებას თავად განსაზღვრავს. | Команда утверждает список и сценарий, разбирает исключения и решает, что делать после фиксации результата. |
| `product.faq.headingPre` | Clear questions, | გასაგები კითხვები, | Понятные вопросы, |
| `product.faq.headingAccent` | plain answers. | პირდაპირი პასუხები. | прямые ответы. |
| `product.faq.subtitle` | What the call can do, when a person steps in, and where consent sets the boundary. | რას აკეთებს ზარი, როდის ერთვება ადამიანი და სად გადის თანხმობის საზღვარი. | Что умеет звонок, когда подключается человек и где проходит граница согласия. |
| `product.faq.q1` | Will <brand></brand> speak Georgian clearly? | <brand></brand> ქართულად გასაგებად ილაპარაკებს? | <brand></brand> будет понятно говорить на грузинском? |
| `product.faq.a1` | The demo uses a short, fixed Georgian question because that is the reliable business task. Listen to the sample here. aiNOW tests your wording before launch and sends open questions to a person. | დემო ქართულად ერთ მოკლე, ფიქსირებულ კითხვას იყენებს, რადგან ეს საიმედო ბიზნესამოცანაა. ნიმუშს აქვე მოუსმინეთ. გაშვებამდე aiNOW-ი ტექსტს ამოწმებს, ღია კითხვა კი თანამშრომელს გადაეცემა. | Демо использует короткий фиксированный вопрос на грузинском, потому что это надёжная бизнес-задача. Послушайте пример. До запуска aiNOW проверяет формулировку и передаёт открытые вопросы человеку. |
| `product.faq.q2` | Will customers know that an AI agent is calling? | კლიენტი მიხვდება, რომ AI აგენტი რეკავს? | Клиент поймёт, что звонит AI-агент? |
| `product.faq.a2` | Yes. The opening identifies the AI agent and your business. aiNOW checks the final wording with you. If your sector needs another disclosure, the campaign pauses until it is cleared. | დიახ. პირველ წინადადებაში აგენტი ამბობს, რომ AI აგენტია, და თქვენს კომპანიას ასახელებს. aiNOW-ი საბოლოო ტექსტს თქვენთან ათანხმებს. თუ სფეროს დამატებითი შეტყობინება სჭირდება, კამპანია შემოწმებამდე ჩერდება. | Да. В первой фразе агент называет себя и вашу компанию. aiNOW согласует формулировку с вами. Если отрасли нужно дополнительное уведомление, кампания ждёт проверки. |
| `product.faq.q3` | Can aiCALL use a bought or scraped number list? | შეიძლება შეძენილი ან სხვაგან შეგროვებული ნომრების გამოყენება? | Можно использовать купленный или собранный список номеров? |
| `product.faq.a3` | No. aiNOW does not call a bought or scraped list. Georgian law requires consent for direct marketing regardless of where the data came from. Under aiNOW's launch policy, every marketing campaign also needs a written or electronic consent record. | არა. aiNOW-ი შეძენილ ან სხვაგან შეგროვებულ სიაზე არ რეკავს. საქართველოს კანონი პირდაპირი მარკეტინგისთვის თანხმობას მონაცემების წყაროს მიუხედავად მოითხოვს. aiNOW-ის კამპანიის დაწყების პოლიტიკის მიხედვით, ყველა მარკეტინგულ კამპანიას თანხმობის წერილობითი ან ელექტრონული ჩანაწერი სჭირდება. | Нет. aiNOW не звонит по купленному или собранному списку. Закон требует согласия на прямой маркетинг независимо от источника данных. По политике запуска aiNOW для каждой маркетинговой кампании также нужно письменное или электронное подтверждение согласия. |
| `product.faq.q4` | Which calls may be suitable without marketing consent? | რომელი ზარი შეიძლება არ იყოს მარკეტინგული? | Какие звонки могут не относиться к маркетингу? |
| `product.faq.a4` | Operational calls to your own customers about an existing appointment, order or agreement may be suitable. A new offer is direct marketing and needs consent. aiNOW's launch policy also asks for a written or electronic consent record. This is guidance, not legal advice. | არსებული ჩაწერის, შეკვეთის ან ხელშეკრულების შესახებ თქვენსავე კლიენტთან ზარი შეიძლება საოპერაციო იყოს. ახალი შეთავაზება პირდაპირი მარკეტინგია და თანხმობას მოითხოვს. aiNOW-ის კამპანიის დაწყების პოლიტიკის მიხედვით, თანხმობის წერილობითი ან ელექტრონული ჩანაწერიც საჭიროა. ეს მითითებაა და არა იურიდიული რჩევა. | Можно рассмотреть операционный звонок своему клиенту по действующей записи, заказу или договору. Новое предложение относится к прямому маркетингу и требует согласия. По политике запуска aiNOW также нужно письменное или электронное подтверждение согласия. Это не юридическая консультация. |
| `product.faq.q5` | What happens when the customer asks an open question? | რა ხდება, თუ კლიენტი ღია კითხვას სვამს? | Что произойдёт, если клиент задаст открытый вопрос? |
| `product.faq.a5` | The agent stops the fixed script and hands the call to a person, or marks a follow-up for your team. It does not invent an answer. | აგენტი ფიქსირებულ სცენარს აჩერებს და ზარს თანამშრომელს გადასცემს ან თქვენს გუნდს შემდგომი დაკავშირების დავალებას უტოვებს. პასუხს არ იგონებს. | Агент остановит сценарий и передаст звонок человеку либо создаст задачу для вашей команды. Он не будет придумывать ответ. |
| `product.faq.q6` | Can the call move to a real employee? | შეიძლება ზარი თანამშრომელთან გადაირთოს? | Можно перевести звонок на сотрудника? |
| `product.faq.a6` | Yes. You choose the handoff number and the situations that require a person. The employee receives the customer while the context is still clear. | დიახ. თქვენ ირჩევთ ნომერსა და იმ შემთხვევებს, როცა თანამშრომელია საჭირო. თანამშრომელი ერთვება მანამ, სანამ საუბრის კონტექსტი ნათელია. | Да. Вы выбираете номер и ситуации для передачи. Сотрудник подключается, пока контекст разговора ещё понятен. |
| `product.faq.q7` | How is the price calculated? | ფასი როგორ ითვლება? | Как рассчитывается цена? |
| `product.faq.a7` | Cost depends on the approved list size and planned call length. The calculator uses your inputs. aiNOW provides a written quote after reviewing the scenario. | ღირებულება დამტკიცებული სიის ზომასა და დაგეგმილი ზარის ხანგრძლივობაზეა დამოკიდებული. კალკულატორი თქვენს მონაცემებს იყენებს. სცენარის განხილვის შემდეგ aiNOW-ი წერილობით შეთავაზებას ამზადებს. | Стоимость зависит от утверждённого размера списка и плановой длительности звонка. Калькулятор использует ваши значения. После проверки сценария aiNOW готовит письменное предложение. |
| `product.faq.q8` | What is needed before a test starts? | რა არის საჭირო სატესტო ზარამდე? | Что нужно до тестового запуска? |
| `product.faq.a8` | aiNOW needs the approved list, short script, consent basis and handoff number. The start date is agreed only after those checks are complete. | საჭიროა დამტკიცებული სია, მოკლე სცენარი, ზარის საფუძველი და თანამშრომლის ნომერი. დაწყების თარიღი ამ შემოწმებების დასრულების შემდეგ თანხმდება. | Нужны утверждённый список, короткий сценарий, основание для звонка и номер сотрудника. Дату запуска согласуют после завершения этих проверок. |
| `product.faq.q9` | What if the customer does not answer? | რა ხდება, თუ კლიენტი არ პასუხობს? | Что будет, если клиент не ответит? |
| `product.faq.a9` | The agreed retry rule applies. After the final attempt, the outcome becomes no answer and your employee decides whether another follow-up is appropriate. | შეთანხმებული განმეორებითი ზარის წესი მოქმედებს. ბოლო ცდის შემდეგ შედეგი „არ უპასუხა“ ხდება და თანამშრომელი წყვეტს, საჭიროა თუ არა კიდევ დაკავშირება. | Система действует по согласованному правилу повторного звонка. После последней попытки появляется результат «нет ответа», а сотрудник решает, нужен ли ещё контакт. |
| `product.faq.q10` | Can aiCALL use our spreadsheet or booking system? | შეიძლება Excel-ის, Google Sheets-ის ან ჩვენი ჩაწერის სისტემის გამოყენება? | Можно использовать Excel, Google Таблицы или нашу систему записи? |
| `product.faq.a10` | Excel and Google Sheets can provide the call list. aiNOW reviews an existing booking system before confirming any connection to it. | Excel-ი და Google Sheets-ი ზარების სიისთვის გამოდგება. aiNOW-ი თქვენს ჩაწერის სისტემას ცალკე სწავლობს, სანამ დაკავშირებას დაადასტურებს. | Excel и Google Таблицы подходят для списка звонков. Перед обещанием интеграции aiNOW отдельно изучает вашу систему записи. |
| `product.faq.q11` | Can the same flow use Russian or English? | იგივე სცენარი რუსულად და ინგლისურადაც აეწყობა? | Можно настроить такой же сценарий на русском и английском? |
| `product.faq.a11` | The flow can be configured for Georgian, Russian and English. Your team approves each language's script and sample separately before calls begin. | სცენარი ქართულ, რუსულ და ინგლისურ ენებზე შეიძლება აეწყოს. გუნდი თითოეული ენის ტექსტსა და ნიმუშს ზარების დაწყებამდე ცალ-ცალკე ამტკიცებს. | Сценарий можно настроить на грузинском, русском и английском. Команда отдельно утверждает текст и пример каждого языка до начала звонков. |
| `product.faq.q12` | What answer rate should we expect? | კლიენტების რა ნაწილი უპასუხებს? | Какой процент клиентов ответит? |
| `product.faq.a12` | aiNOW does not publish a borrowed answer rate as your result. The outcome board shows what will be measured on your approved campaign without presenting this demo as customer data. | aiNOW-ი სხვის მაჩვენებელს თქვენს შედეგად არ ასაღებს. შედეგების დაფა აჩვენებს, რა გაიზომება დამტკიცებულ კამპანიაში, თუმცა დემოს კლიენტის მონაცემებად არ წარმოაჩენს. | aiNOW не выдаёт чужой процент дозвона за ваш результат. Доска показывает, какие показатели будут измеряться в утверждённой кампании, но не представляет демо как данные клиента. |
| `product.faq.q13` | Can it remind customers about a payment? | შეიძლება გადახდის შეხსენება? | Можно напоминать о платеже? |
| `product.faq.a13` | A reminder tied to an existing agreement can be reviewed. A dispute, new offer or payment question goes to a person. aiCALL does not collect card details by phone. | არსებულ ხელშეკრულებასთან დაკავშირებული შეხსენება შეიძლება განიხილოთ. დავა, ახალი შეთავაზება ან გადახდის კითხვა თანამშრომელს გადაეცემა. aiCALL-ი ტელეფონით ბარათის მონაცემებს არ იღებს. | Можно рассмотреть напоминание по действующему договору. Спор, новое предложение или вопрос об оплате передаётся человеку. aiCALL не принимает данные карты по телефону. |
| `product.faq.q14` | What is the difference between aiCALL, aiSTAFF and aiOFFICE? | რით განსხვავდება aiCALL, aiSTAFF და aiOFFICE? | Чем отличаются aiCALL, aiSTAFF и aiOFFICE? |
| `product.faq.a14` | aiCALL handles approved phone calls. aiSTAFF handles customer messages. aiOFFICE supports internal documents and approvals. aiNOW helps you choose the product that matches the work. | aiCALL-ი დამტკიცებულ სატელეფონო ზარებს ამუშავებს. aiSTAFF-ი კლიენტების შეტყობინებებს პასუხობს. aiOFFICE-ი შიდა დოკუმენტებსა და შეთანხმებებს უჭერს მხარს. aiNOW-ი ამოცანის შესაბამისი პროდუქტის არჩევაში გეხმარებათ. | aiCALL обрабатывает утверждённые телефонные звонки. aiSTAFF отвечает за сообщения клиентов. aiOFFICE поддерживает внутренние документы и согласования. aiNOW помогает выбрать продукт под вашу задачу. |
| `product.cta.heading` | Hear the short Georgian confirmation | მოისმინეთ მოკლე ქართული დადასტურება | Послушайте короткое подтверждение на грузинском |
| `product.cta.subtitle` | Share a business number and the scenario you want to review. aiNOW confirms the consent boundary first, then arranges a demo call. No call is sent from this page automatically. | მიუთითეთ სამუშაო ნომერი და სცენარი, რომლის განხილვაც გსურთ. ჯერ aiNOW-ი თანხმობის საზღვარს ამოწმებს, შემდეგ კი სადემონსტრაციო ზარს ათანხმებს. ამ გვერდიდან ზარი ავტომატურად არ იგზავნება. | Укажите рабочий номер и сценарий для проверки. Сначала aiNOW уточнит границу согласия, затем согласует демонстрационный звонок. Эта страница ничего не отправляет автоматически. |
| `product.cta.phoneLabel` | Business phone number | სამუშაო ტელეფონის ნომერი | Рабочий номер телефона |
| `product.cta.phoneSubmit` | Request a reviewed demo | შემოწმებული დემოს მოთხოვნა | Запросить проверенное демо |
| `product.cta.phoneNote` | aiNOW reviews the request before arranging a call | ზარის შეთანხმებამდე მოთხოვნას aiNOW-ი ამოწმებს | aiNOW проверяет запрос до согласования звонка |
| `product.cta.orWrite` | Or write to aiNOW: | ან მისწერეთ aiNOW-ს: | Или напишите aiNOW: |
| `product.wordmark.line` | The chair does not stay empty. | სკამი ცარიელი აღარ რჩება. | Кресло больше не пустует. |
| `product.hear.eyebrow` | The Georgian question | ქართული კითხვა | Вопрос на грузинском |
| `product.hear.heading` | One short question, in Georgian. | ერთი მოკლე კითხვა ქართულად. | Один короткий вопрос на грузинском. |
| `product.hear.subtitle` | The silent Georgian transcript starts when this section is visible. Press Play only if you want to start audio. The customer can confirm, choose another time or ask for a person. | უხმო ტრანსკრიპტი მაშინ ირთვება, როცა ეს ნაწილი ჩანს. ხმას მხოლოდ დაკვრის ღილაკზე დაჭერის შემდეგ გაიგონებთ. კლიენტს შეუძლია დაადასტუროს, სხვა დრო აირჩიოს ან თანამშრომელი მოითხოვოს. | Тихая расшифровка запускается, когда раздел виден. Нажмите кнопку воспроизведения, только если хотите включить звук. Клиент может подтвердить, выбрать другое время или попросить человека. |
| `product.hear.play` | Start audio | ხმის ჩართვა | Включить звук |
| `product.hear.pause` | Pause audio | ხმის შეჩერება | Остановить звук |
| `product.hear.replay` | Replay transcript | ტრანსკრიპტის გამეორება | Повторить расшифровку |
| `product.hear.result` | Outcome recorded | შედეგი დაფიქსირდა | Результат записан |
| `product.hear.silentStatus` | Silent preview | უხმო ჩვენება | Тихий просмотр |
| `product.hear.audioStatus` | Audio started by you | თქვენ მიერ ჩართული ხმა | Звук включён вами |
| `product.hear.pending` | Audio is not available yet. The timed transcript shows the approved script; no sound is being played. | ხმა ჯერ ხელმისაწვდომი არ არის. დროში გაწერილი ტრანსკრიპტი დამტკიცებულ სცენარს აჩვენებს; აუდიო არ ირთვება. | Звук пока недоступен. Расшифровка показывает утверждённый сценарий по времени; аудио не воспроизводится. |
| `product.hear.agent` | AI agent | AI აგენტი | AI-агент |
| `product.hear.customer` | Customer | კლიენტი | Клиент |
| `product.hear.s1Title` | Appointment confirmation | ჩაწერის დადასტურება | Подтверждение записи |
| `product.hear.s1Sub` | Tomorrow at 14:00 | ხვალ, 14:00 საათზე | Завтра в 14:00 |
| `product.hear.s2Title` | Delivery confirmation | მიწოდების დადასტურება | Подтверждение доставки |
| `product.hear.s2Sub` | Choose tomorrow or another day | ხვალ ან სხვა დღეს | Завтра или в другой день |
| `product.hear.s3Title` | Payment reminder | გადახდის შეხსენება | Напоминание о платеже |
| `product.hear.s3Sub` | Existing agreement only | მხოლოდ არსებული ხელშეკრულებისთვის | Только по действующему договору |
| `product.hear.s4Title` | Missed-call follow-up | გამოტოვებულ ზარზე პასუხი | Ответ на пропущенный звонок |
| `product.hear.s4Sub` | A person takes the open question | ღია კითხვას თანამშრომელი იღებს | Открытый вопрос принимает человек |
| `product.consent.eyebrow` | Consent comes before the call | თანხმობა ზარამდე მოწმდება | Согласие проверяется до звонка |
| `product.consent.heading` | Check the list before any campaign starts. | კამპანიის დაწყებამდე სია შეამოწმეთ. | Проверьте список до начала кампании. |
| `product.consent.subtitle` | Answer all three questions yourself. aiCALL never fills them in for you. | სამივე კითხვას თავად უპასუხეთ. aiCALL-ი პასუხს არასდროს ირჩევს თქვენს ნაცვლად. | Ответьте на все три вопроса сами. aiCALL никогда не выбирает ответы за вас. |
| `product.consent.q1` | Are these your own customers? | ეს თქვენი საკუთარი კლიენტები არიან? | Это ваши собственные клиенты? |
| `product.consent.q1yes` | Yes, they booked, ordered or signed with us | დიახ, მათ ჩვენთან ჩაწერა, შეკვეთა ან ხელშეკრულება აქვთ | Да, они записались, заказали или заключили договор |
| `product.consent.q1no` | No, the list was bought, shared or collected elsewhere | არა, სია შეძენილია, გადმოცემულია ან სხვაგან შეგროვდა | Нет, список куплен, передан или собран в другом месте |
| `product.consent.q2` | Is the call only about their existing relationship with you? | ზარი მხოლოდ თქვენთან არსებულ ურთიერთობას ეხება? | Звонок касается только действующих отношений с вами? |
| `product.consent.q2yes` | Yes, an appointment, order or current agreement | დიახ, ჩაწერას, შეკვეთას ან მოქმედ ხელშეკრულებას | Да, запись, заказ или действующий договор |
| `product.consent.q2no` | No, we want to offer something new | არა, ახალი შეთავაზების გაკეთება გვსურს | Нет, хотим предложить что-то новое |
| `product.consent.q3` | Under aiNOW's launch policy, can you show a consent record for marketing calls? | aiNOW-ის კამპანიის დაწყების პოლიტიკის მიხედვით, შეგიძლიათ მარკეტინგზე თანხმობის ჩანაწერის წარდგენა? | По политике запуска aiNOW у вас есть письменное или электронное подтверждение согласия на маркетинговые звонки? |
| `product.consent.q3yes` | Yes, a written or electronic record is available | დიახ, წერილობითი ან ელექტრონული ჩანაწერი ხელმისაწვდომია | Да, есть письменное или электронное подтверждение |
| `product.consent.q3no` | No, or the consent record is uncertain | არა, ან თანხმობის ჩანაწერი გაურკვეველია | Нет, или подтверждение согласия вызывает сомнение |
| `product.consent.green` | An operational call may proceed | საოპერაციო ზარის მომზადება შეიძლება | Операционный звонок можно готовить |
| `product.consent.greenBody` | These are your own customers and the call concerns an existing appointment, order or agreement. aiNOW can prepare an operational script after the details are checked. | ეს თქვენი კლიენტებია და ზარი არსებულ ჩაწერას, შეკვეთას ან ხელშეკრულებას ეხება. დეტალების შემოწმების შემდეგ aiNOW-ს შეუძლია საოპერაციო სცენარი მოამზადოს. | Это ваши клиенты, а звонок относится к действующей записи, заказу или договору. После проверки деталей aiNOW может подготовить операционный сценарий. |
| `product.consent.amber` | Pause for a consent review | შეჩერდით თანხმობის შესამოწმებლად | Остановитесь для проверки согласия |
| `product.consent.amberBody` | One answer changes the call category. Do not start yet. aiNOW separates operational calls from marketing. Under aiNOW's launch policy, every marketing launch needs a written or electronic consent record. | ერთი პასუხი ზარის კატეგორიას ცვლის. კამპანია ჯერ არ დაიწყოთ. aiNOW-ი საოპერაციო ზარს მარკეტინგისგან გამოყოფს. aiNOW-ის კამპანიის დაწყების პოლიტიკის მიხედვით, ყოველი მარკეტინგული კამპანიისთვის თანხმობის წერილობითი ან ელექტრონული ჩანაწერია საჭირო. | Один ответ меняет категорию звонка. Пока не запускайте кампанию. aiNOW отделит операционный звонок от маркетинга. По политике запуска aiNOW для каждой маркетинговой кампании нужно письменное или электронное подтверждение согласия. |
| `product.consent.red` | Do not call this list | ამ სიაზე არ დარეკოთ | Не звоните по этому списку |
| `product.consent.redBody` | The list is not yours and no marketing-consent record is available. Under aiNOW's launch policy, calls will not start from this list. | სია თქვენს ორგანიზაციას არ ეკუთვნის და მარკეტინგზე თანხმობის ჩანაწერი არ არსებობს. aiNOW-ის კამპანიის დაწყების პოლიტიკის მიხედვით, ამ სიაზე ზარები არ დაიწყება. | Список не принадлежит вам, и подтверждение согласия на маркетинг отсутствует. По политике запуска aiNOW звонки по этому списку не начнутся. |
| `product.consent.law` | Under Article 12, direct marketing needs consent regardless of how the data were obtained or whether they are publicly accessible. Written consent is required when the data go beyond name, surname, address, phone number and email. A withdrawal request must be honoured within seven working days. | „პერსონალურ მონაცემთა დაცვის შესახებ“ კანონის მე-12 მუხლით, პირდაპირი მარკეტინგისთვის თანხმობა საჭიროა მონაცემების მოპოვების გზისა და მათი საჯარო ხელმისაწვდომობის მიუხედავად. თუ სახელის, გვარის, მისამართის, ტელეფონის ნომრისა და ელფოსტის გარდა სხვა მონაცემებიც მუშავდება, საჭიროა წერილობითი თანხმობა. თანხმობის გამოხმობის მოთხოვნა შვიდ სამუშაო დღეში უნდა შესრულდეს. | По статье 12 согласие на прямой маркетинг нужно независимо от способа получения данных и их общедоступности. Письменное согласие требуется, если обрабатываются данные помимо имени, фамилии, адреса, телефона и электронной почты. Требование об отзыве согласия нужно выполнить не позднее семи рабочих дней. |
| `product.consent.notice` | This check is practical guidance, not legal advice. If the facts are unclear, aiNOW pauses the campaign and asks for a legal review. | ეს შემოწმება პრაქტიკული მითითებაა და არა იურიდიული რჩევა. თუ გარემოება გაურკვეველია, aiNOW-ი კამპანიას აჩერებს და იურიდიულ შეფასებას ითხოვს. | Эта проверка — практический ориентир, а не юридическая консультация. Если обстоятельства неясны, aiNOW приостанавливает кампанию и просит юридическую проверку. |
| `product.consent.reset` | Clear my answers | ჩემი პასუხების გასუფთავება | Очистить мои ответы |
| `product.board.eyebrow` | A visible outcome | ხილული შედეგი | Видимый результат |
| `product.board.heading` | See the outcome of every call. | ყველა ზარის შედეგი თვალწინაა. | Результат каждого звонка перед глазами. |
| `product.board.subtitle` | This is a fixed product demonstration, not customer data. It shows how 100 sample calls move into four action queues. | ეს პროდუქტის ფიქსირებული დემოა და არა კლიენტის მონაცემები. ის აჩვენებს, როგორ ნაწილდება 100 საცდელი ზარი მოქმედების ოთხ ჯგუფში. | Это фиксированная демонстрация продукта, а не данные клиента. Она показывает, как 100 примеров распределяются по четырём очередям действий. |
| `product.board.run` | Run the example | ნიმუშის გაშვება | Запустить пример |
| `product.board.running` | Sorting calls | ზარები ნაწილდება | Распределяем звонки |
| `product.board.again` | Run it again | თავიდან გაშვება | Запустить ещё раз |
| `product.board.replay` | Replay 100-call example | 100 ზარის ნიმუშის გამეორება | Повторить пример со 100 звонками |
| `product.board.result` | calls sorted | ზარი განაწილდა | звонков распределено |
| `product.board.confirmed` | Confirmed | დადასტურდა | Подтверждено |
| `product.board.moved` | New time | ახალი დრო | Новое время |
| `product.board.noanswer` | No answer | პასუხი არ არის | Нет ответа |
| `product.board.human` | Human follow-up | საჭიროა თანამშრომელი | Нужен сотрудник |
| `product.board.called` | calls shown | ზარი ნაჩვენებია | звонков показано |
| `product.board.note` | Example only. Your board will use your approved list and actual call outcomes. | ეს მხოლოდ ნიმუშია. თქვენს დაფაზე დამტკიცებული სია და ზარების რეალური შედეგები გამოჩნდება. | Это пример. В вашей доске будут утверждённый список и реальные результаты звонков. |
| `product.barge.eyebrow` | Human handoff | თანამშრომელთან გადაცემა | Передача человеку |
| `product.barge.heading` | The customer can stop the script. | კლიენტს სცენარის შეჩერება შეუძლია. | Клиент может остановить сценарий. |
| `product.barge.subtitle` | Watch the agent stop, acknowledge the interruption, offer a next step and mark the outcome. Press Interrupt to try it yourself. | ნახეთ, როგორ ჩერდება აგენტი, იღებს შეწყვეტას, სთავაზობს შემდეგ ნაბიჯს და შედეგს აფიქსირებს. ხელით შესამოწმებლად დააჭირეთ „გაწყვეტას“. | Посмотрите, как агент замолкает, принимает перебивание, предлагает следующий шаг и отмечает результат. Нажмите «Перебить», чтобы проверить вручную. |
| `product.barge.speaking` | Agent is speaking | აგენტი საუბრობს | Агент говорит |
| `product.barge.interrupt` | Interrupt | გაწყვეტა | Перебить |
| `product.barge.interrupted` | The agent stopped | აგენტი გაჩერდა | Агент остановился |
| `product.barge.busy` | I am busy right now | ახლა დაკავებული ვარ | Я сейчас занят |
| `product.barge.recovery` | Understood. When should a person call you back? | გასაგებია. როდის დაგიკავშირდეთ თანამშრომელი? | Понял. Когда сотруднику лучше вам перезвонить? |
| `product.barge.recoveryStatus` | Offering a human follow-up | თანამშრომლის ზარის შეთავაზება | Предлагаем звонок сотрудника |
| `product.barge.result` | Human follow-up recorded | თანამშრომლის დავალება ჩაიწერა | Задача для сотрудника записана |
| `product.barge.replay` | Replay story | სცენარის გამეორება | Повторить историю |
| `product.barge.note` | The agent does not argue or guess. A changed request becomes a clear task for your employee. | აგენტი არ კამათობს და პასუხს არ იგონებს. შეცვლილი მოთხოვნა თანამშრომლის გასაგებ დავალებად იქცევა. | Агент не спорит и не угадывает. Изменившаяся просьба становится понятной задачей для сотрудника. |
| `product.cost.eyebrow` | Your inputs stay yours | თქვენი მონაცემები თქვენთან რჩება | Ваши значения остаются вашими |
| `product.cost.heading` | Put your current call work into numbers. | ზარების მიმდინარე სამუშაო ციფრებში გადაიყვანეთ. | Посчитайте текущую работу со звонками. |
| `product.cost.subtitle` | The sample moves until you touch a slider. Your first change stops it, and aiCALL never replaces your values. | ნიმუში მანამდე იცვლება, სანამ სლაიდერს შეეხებით. პირველი ცვლილება მოძრაობას აჩერებს და aiCALL-ი თქვენს მნიშვნელობებს აღარ ცვლის. | Пример движется, пока вы не тронете ползунок. Первое изменение останавливает его, и aiCALL больше не заменяет ваши значения. |
| `product.cost.contacts` | Customers to call | დასარეკი კლიენტი | Клиентов для звонка |
| `product.cost.minutes` | Planned minutes per call | ზარის დაგეგმილი ხანგრძლივობა | Плановая длительность звонка |
| `product.cost.wage` | Administrator cost per hour, GEL | ადმინისტრატორის ერთი საათის ღირებულება, ლარი | Стоимость часа администратора, лари |
| `product.cost.human` | Current staff time | თანამშრომლის მიმდინარე დრო | Текущее время сотрудников |
| `product.cost.agent` | aiCALL planning estimate | aiCALL-ის წინასწარი შეფასება | Плановая оценка aiCALL |
| `product.cost.result` | Your calculation | თქვენი გამოთვლა | Ваш расчёт |
| `product.cost.hours` | staff hours in the calculation | თანამშრომლის საათი გამოთვლაში | часов сотрудников в расчёте |
| `product.cost.perMonth` | for this list | ამ სიისთვის | для этого списка |
| `product.cost.note` | The aiCALL amount uses aiNOW's planning rate for this example. The list size, call length and staff cost come from your sliders. | ამ ნიმუშში aiCALL-ის თანხა aiNOW-ის საორიენტაციო ტარიფით ითვლება. სიის ზომას, ზარის ხანგრძლივობასა და თანამშრომლის ღირებულებას თქვენი სლაიდერები განსაზღვრავს. | Сумма aiCALL использует плановую ставку aiNOW для этого примера. Размер списка, длительность звонка и стоимость сотрудника задают ваши ползунки. |
| `product.proof.ringing` | Calling an approved customer | შემოწმებულ კლიენტთან რეკავს | Звоним проверенному клиенту |
| `product.proof.speaking` | Asking the Georgian question | ქართულ კითხვას სვამს | Задаём вопрос на грузинском |
| `product.proof.done` | Confirmation recorded | დადასტურება ჩაიწერა | Подтверждение записано |
| `product.proof.line0` | Dialling an approved customer | შემოწმებულ კლიენტთან ზარი | Набираем проверенного клиента |
| `product.proof.line1` | გამარჯობა, კლინიკის AI აგენტი ვარ. ხვალ ორ საათზე გელოდებით. დაადასტურებთ? | გამარჯობა, კლინიკის AI აგენტი ვარ. ხვალ ორ საათზე გელოდებით. დაადასტურებთ? | გამარჯობა, კლინიკის AI აგენტი ვარ. ხვალ ორ საათზე გელოდებით. დაადასტურებთ? |
| `product.proof.line2` | დიახ, ვიქნები. | დიახ, ვიქნები. | დიახ, ვიქნები. |
| `product.proof.sheet` | Visible call outcome | ზარის ხილული შედეგი | Видимый результат звонка |
| `product.proof.confirmedShort` | confirmed | დადასტურდა | подтверждено |
| `product.proof.result` | Outcome saved | შედეგი ჩაიწერა | Результат сохранён |
| `product.proof.replay` | Replay | გამეორება | Повторить |
