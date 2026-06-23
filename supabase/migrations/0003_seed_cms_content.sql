-- Run this in the Supabase SQL editor AFTER 0002_create_cms_content_tables.sql.
-- Seeds the cms_ tables with today's actual live content (copied directly
-- from src/content/*.json) so the admin app isn't starting from empty tables.

insert into public.cms_hero (id, badge, phrases, subheadline, cta1, cta2, stats) values
('en', 'Founded in 2015 · Cairo, Egypt',
 $j$["Professional Accounting & Auditing Services","Trusted by 100+ Businesses Across Egypt","ACCA-Certified Financial Experts","Your Partner in Compliance & Growth"]$j$::jsonb,
 'We are a professional group of accountants and auditors who provide our clients a full range of financial services.',
 'Our Services', 'Download Profile',
 $j$[{"value":"10+","label":"Years of Experience","count":10,"before":"","after":"+"},{"value":"100+","label":"Clients Served","count":100,"before":"","after":"+"},{"value":"5","label":"Core Services","count":5,"before":"","after":""},{"value":"ACCA","label":"Certified","count":null,"before":"","after":""}]$j$::jsonb),
('ar', 'تأسس عام 2015 · القاهرة، مصر',
 $j$["خدمات محاسبة ومراجعة احترافية","موثوق به من أكثر من 100 شركة في مصر","خبراء ماليون معتمدون من ACCA","شريكك في الامتثال والنمو"]$j$::jsonb,
 'نحن مجموعة متخصصة من المحاسبين والمراجعين نقدم لعملائنا مجموعة متكاملة من الخدمات المالية.',
 'خدماتنا', 'تحميل الملف التعريفي',
 $j$[{"value":"+10","label":"سنوات من الخبرة","count":10,"before":"+","after":""},{"value":"+100","label":"عميل تم خدمته","count":100,"before":"+","after":""},{"value":"5","label":"خدمات أساسية","count":5,"before":"","after":""},{"value":"ACCA","label":"معتمد دولياً","count":null,"before":"","after":""}]$j$::jsonb)
on conflict (id) do nothing;

insert into public.cms_about (id, badge, title, story, detail, promise, highlights, stats) values
('en', 'Who We Are', 'About YG-Auditors',
 'Youssef Galal, FCCA — Public Accountant and Consultancy was founded in 2015 with a single commitment: to provide the highest quality financial services to every client we serve.',
 'Our office is located in New Maadi, Cairo, Egypt. We serve a wide variety of clients across Egypt — from large corporations to small businesses, non-profit organizations, and individual professionals.',
 $j$We make sure that every client is served by the expertise of our whole firm — combining deep regulatory knowledge, international standards, and local market understanding.$j$,
 $j$[{"icon":"🏆","title":"ACCA Certified","desc":"International professional standard from the UK's leading accountancy body"},{"icon":"🏛️","title":"Ministry Approved","desc":"Officially registered in the Egyptian Ministry of Finance general registry"},{"icon":"📍","title":"Based in Maadi","desc":"Conveniently located in New Maadi, Cairo with Egypt-wide client service"}]$j$::jsonb,
 $j$[{"value":"2015","label":"Year Founded","count":2015,"before":"","after":""},{"value":"10+","label":"Years Active","count":10,"before":"","after":"+"},{"value":"100+","label":"Clients Served","count":100,"before":"","after":"+"},{"value":"5","label":"Core Services","count":5,"before":"","after":""}]$j$::jsonb),
('ar', 'من نحن', 'عن مكتبنا',
 'تأسس مكتب يوسف جلال للمحاسبة القانونية والاستشارات عام 2015 بالتزام واحد: تقديم أعلى مستويات الخدمات المالية لكل عميل نخدمه.',
 'مكتبنا يقع في منطقة المعادي الجديدة، القاهرة، مصر. نخدم مجموعة واسعة من العملاء في جميع أنحاء مصر — من الشركات الكبرى إلى الشركات الصغيرة والمنظمات غير الربحية والمهنيين الأفراد.',
 'نحرص على خدمة كل عميل بخبرة مكتبنا بأكمله — من خلال الجمع بين المعرفة التنظيمية العميقة والمعايير الدولية وفهم السوق المحلي.',
 $j$[{"icon":"🏆","title":"شهادة ACCA","desc":"معيار مهني دولي من الهيئة المحاسبية الرائدة في المملكة المتحدة"},{"icon":"🏛️","title":"موافقة وزارية","desc":"مسجل رسمياً في السجل العام لوزارة المالية المصرية"},{"icon":"📍","title":"في المعادي","desc":"موقع مريح في المعادي الجديدة، القاهرة، مع خدمة عملاء في جميع أنحاء مصر"}]$j$::jsonb,
 $j$[{"value":"2015","label":"سنة التأسيس","count":2015,"before":"","after":""},{"value":"+10","label":"سنوات نشاط","count":10,"before":"+","after":""},{"value":"+100","label":"عميل تم خدمته","count":100,"before":"+","after":""},{"value":"5","label":"خدمات أساسية","count":5,"before":"","after":""}]$j$::jsonb)
on conflict (id) do nothing;

insert into public.cms_services (id, badge, title, sub, hint, services, stats) values
('en', 'What We Offer', 'Our Services', 'Delivered across 15+ cities in Egypt with international reach through the PA Global network.', 'Drag to rotate',
 $j$[{"num":"01","label":"Audit & Assurance","desc":"Independent examination of financial statements ensuring accuracy, regulatory compliance, and stakeholder confidence."},{"num":"02","label":"Tax Advisory","desc":"Strategic tax planning, filing, and compliance services tailored to Egyptian tax law and international standards."},{"num":"03","label":"Accounting Outsourcing","desc":"Full-cycle bookkeeping, payroll processing, and financial reporting so you can focus on growing your business."},{"num":"04","label":"Social Insurance","desc":"Registration, calculation, and compliance management for employee social insurance obligations."},{"num":"05","label":"Business Setup","desc":"End-to-end company formation, licensing, and regulatory registration across Egypt."}]$j$::jsonb,
 $j$[{"num":"10","plus":"+","label":"Years Active"},{"num":"100","plus":"+","label":"Clients Served"},{"num":"15","plus":"+","label":"Cities Covered"},{"num":"ACCA","plus":"","label":"Certified"}]$j$::jsonb),
('ar', 'ما نقدمه', 'خدماتنا', 'نخدم أكثر من 15 مدينة في مصر مع امتداد دولي عبر شبكة PA Global.', 'اسحب للتدوير',
 $j$[{"num":"01","label":"تدقيق وتأكيد","desc":"فحص مستقل للقوائم المالية لضمان الدقة والامتثال التنظيمي وثقة أصحاب المصلحة."},{"num":"02","label":"استشارات ضريبية","desc":"تخطيط ضريبي استراتيجي وتقديم الإقرارات والامتثال وفقاً للقانون الضريبي المصري والمعايير الدولية."},{"num":"03","label":"مسك الدفاتر","desc":"خدمات محاسبية متكاملة وكشوف رواتب وتقارير مالية حتى تتفرغ لتنمية أعمالك."},{"num":"04","label":"تأمينات اجتماعية","desc":"تسجيل وحساب وإدارة الامتثال لالتزامات التأمينات الاجتماعية للموظفين."},{"num":"05","label":"تأسيس الأعمال","desc":"تأسيس الشركات والتراخيص والتسجيل التنظيمي من الألف إلى الياء في جميع أنحاء مصر."}]$j$::jsonb,
 $j$[{"num":"10","plus":"+","label":"سنوات نشاط"},{"num":"100","plus":"+","label":"عميل تم خدمته"},{"num":"15","plus":"+","label":"مدينة مغطاة"},{"num":"ACCA","plus":"","label":"معتمد دولياً"}]$j$::jsonb)
on conflict (id) do nothing;

insert into public.cms_qualifications (id, badge, title, sub, memberships, approvals) values
('en', 'Our Credentials', 'Qualifications & Approvals', 'Youssef Galal holds internationally recognised qualifications and is officially approved by every major Egyptian financial regulatory authority.',
 $j${"heading":"Professional Memberships","items":[{"abbr":"ACCA","name":"Association of Certified Chartered Accountants","country":"United Kingdom","desc":"The global body for professional accountants, with FCCA designation representing Fellow membership.","color":"#6C3FA0"},{"abbr":"ESAA","name":"Egyptian Society of Accountants and Auditors","country":"Egypt","desc":"The primary professional body for accountants and auditors in Egypt.","color":"#3A86FF"},{"abbr":"ETA","name":"Egyptian Tax Association","country":"Egypt","desc":"Specialist professional body for tax practitioners operating in the Egyptian market.","color":"#F5A623"}]}$j$::jsonb,
 $j${"heading":"Regulatory Approvals","items":[{"icon":"🏛️","name":"Ministry of Finance","detail":"General Registry of Accountants and Auditors — Joint-Stock Companies","authority":"Egyptian Government"},{"icon":"⚖️","name":"Syndicate of Commerce","detail":"Practicing Division of Accountants and Auditors","authority":"Egyptian Government"},{"icon":"📈","name":"GAFI","detail":"General Authority for Investment and Free-Zones — Auditor of SAE Companies","authority":"Egyptian Government"},{"icon":"🏦","name":"EFSA","detail":"Egyptian Financial Supervisory Authority — Auditor, Micro-finance Registry (c)","authority":"Egyptian Government"}]}$j$::jsonb),
('ar', 'مؤهلاتنا', 'المؤهلات والاعتمادات', 'يحمل يوسف جلال مؤهلات معترفاً بها دولياً، وهو معتمد رسمياً من قِبل جميع الجهات التنظيمية المالية المصرية الكبرى.',
 $j${"heading":"العضوية المهنية","items":[{"abbr":"ACCA","name":"جمعية المحاسبين القانونيين المعتمدين","country":"المملكة المتحدة","desc":"الهيئة العالمية للمحاسبين المهنيين، مع درجة FCCA التي تمثل عضوية الزمالة.","color":"#6C3FA0"},{"abbr":"ESAA","name":"جمعية المحاسبين والمراجعين المصريين","country":"مصر","desc":"الهيئة المهنية الرئيسية للمحاسبين والمراجعين في مصر.","color":"#3A86FF"},{"abbr":"ETA","name":"جمعية الضرائب المصرية","country":"مصر","desc":"هيئة مهنية متخصصة لممارسي الضرائب العاملين في السوق المصرية.","color":"#F5A623"}]}$j$::jsonb,
 $j${"heading":"الموافقات التنظيمية","items":[{"icon":"🏛️","name":"وزارة المالية","detail":"السجل العام للمحاسبين والمراجعين — شركات مساهمة","authority":"الحكومة المصرية"},{"icon":"⚖️","name":"نقابة التجاريين","detail":"قسم ممارسة المحاسبين والمراجعين","authority":"الحكومة المصرية"},{"icon":"📈","name":"الهيئة العامة للاستثمار (GAFI)","detail":"مراجع شركات المساهمة المصرية (SAE)","authority":"الحكومة المصرية"},{"icon":"🏦","name":"الهيئة المصرية للرقابة المالية (EFSA)","detail":"مراجع — سجل التمويل متناهي الصغر (ج)","authority":"الحكومة المصرية"}]}$j$::jsonb)
on conflict (id) do nothing;

insert into public.cms_consultant (id, badge, title, sub, name_placeholder, email_placeholder, message_placeholder, submit, info) values
('en', 'Free Consultation', 'Get Expert Financial Advice', 'With No Obligation — Tell us about your needs and one of our professionals will get back to you.',
 'Your Full Name', 'Email Address', 'Describe your financial needs or question...', 'Send Message',
 $j$[{"icon":"📞","label":"Phone","value":"+20 2 2517 9678","href":"tel:+20225179678"},{"icon":"📱","label":"Mobile","value":"+20 100 480 9543","href":"tel:+201004809543"},{"icon":"📧","label":"Email","value":"Ygalal@yg-auditors.com","href":"mailto:Ygalal@yg-auditors.com"},{"icon":"🕐","label":"Hours","value":"Sun–Thu, 9AM–5PM","href":null}]$j$::jsonb),
('ar', 'استشارة مجانية', 'احصل على استشارة مالية متخصصة', 'بدون أي التزام — أخبرنا باحتياجاتك وسيتواصل معك أحد متخصصينا في أقرب وقت.',
 'الاسم الكامل', 'البريد الإلكتروني', 'اشرح احتياجاتك المالية أو سؤالك...', 'إرسال الرسالة',
 $j$[{"icon":"📞","label":"هاتف","value":"+20 2 2517 9678","href":"tel:+20225179678"},{"icon":"📱","label":"جوال","value":"+20 100 480 9543","href":"tel:+201004809543"},{"icon":"📧","label":"بريد إلكتروني","value":"Ygalal@yg-auditors.com","href":"mailto:Ygalal@yg-auditors.com"},{"icon":"🕐","label":"مواعيد العمل","value":"الأحد–الخميس، 9 ص–5 م","href":null}]$j$::jsonb)
on conflict (id) do nothing;

insert into public.cms_team_section (id, badge, title, sub, labels) values
('en', 'Leadership', 'Meet Our Founder', 'A qualified ACCA professional dedicated to delivering exceptional financial services across Egypt since 2015.',
 $j${"about":"About","qualifications":"Memberships","specializations":"Specializations","viewCert":"View Certificate","founded":"Founded","experience":"Years Experience","clients":"Clients+","certified":"Certified"}$j$::jsonb),
('ar', 'القيادة', 'تعرف على مؤسسنا', 'محاسب قانوني مؤهل ACCA ملتزم بتقديم خدمات مالية استثنائية في جميع أنحاء مصر منذ عام 2015.',
 $j${"about":"نبذة","qualifications":"العضويات المهنية","specializations":"التخصصات","viewCert":"عرض الشهادة","founded":"سنة التأسيس","experience":"سنوات خبرة","clients":"عميل+","certified":"معتمد دولياً"}$j$::jsonb)
on conflict (id) do nothing;

insert into public.cms_contact_section (id, badge, title, sub) values
('en', 'Get In Touch', 'Contact Us', 'We are here to help. Reach out to us through any of the channels below.'),
('ar', 'تواصل معنا', 'اتصل بنا هيااااا', 'نحن هنا للمساعدة. تواصل معنا من خلال أي من القنوات أدناه.')
on conflict (id) do nothing;

insert into public.cms_team (id, name, arabic_name, credentials, full_title, role, designation, photo, bio, certificate, qualifications, specializations, social) values
('youssef-galal', 'Youssef Galal', 'يوسف جلال', 'ACCA', 'Youssef Galal, ACCA',
 $j${"en":"Founder & Principal Accountant","ar":"المؤسس والمحاسب القانوني"}$j$::jsonb,
 'Public Accountant and Consultant', '/images/intro-img1.png',
 $j${"en":"Youssef Galal is a qualified Chartered Certified Accountant (ACCA) and the founder of YG-Auditors. Since establishing the firm in 2015, he has led a professional team dedicated to delivering comprehensive financial services to clients across Egypt.","ar":"يوسف جلال محاسب قانوني مؤهل (ACCA) ومؤسس مكتب YG للمحاسبة والمراجعة. منذ تأسيس المكتب عام 2015، يقود فريقاً متخصصاً يقدم خدمات مالية شاملة للعملاء في مختلف أنحاء مصر."}$j$::jsonb,
 '/certificate-acca.png',
 $j$["ACCA – Association of Chartered Certified Accountants"]$j$::jsonb,
 $j$["Audit & Assurance","Tax Advisory","Business Consulting","Financial Reporting"]$j$::jsonb,
 $j${"facebook":"https://www.facebook.com/Youssef-Galal-ACCA-512331115638403/","linkedin":"https://www.linkedin.com/in/youssef-galal-acca/"}$j$::jsonb)
on conflict (id) do nothing;

insert into public.cms_contact_info (id, contact, external_links) values
('info',
 $j${"address":{"en":"Building 7W, Magdy Salama Street, La Silky District, Maadi, Cairo, Egypt","ar":"مبنى 7و، شارع مجدي سلامة، حي اللاسلكي، المعادي، القاهرة، مصر","area":"New Maadi","city":"Cairo","country":"Egypt"},"phones":[{"number":"+20-25179678","display":"0020-25179678","type":"landline"},{"number":"+20-1004809543","display":"0020-100 480 95 43","type":"mobile"}],"email":"Ygalal@yg-auditors.com","workingHours":{"days":{"en":"Sunday – Thursday","ar":"الأحد – الخميس"},"hours":"9:00 AM – 5:00 PM","timezone":"Cairo Time"},"social":{"facebook":{"url":"https://www.facebook.com/Youssef-Galal-ACCA-512331115638403/","label":"Facebook"},"linkedin":{"url":"https://www.linkedin.com/in/youssef-galal-acca/","label":"LinkedIn"}},"consultant":{"heading":{"en":"Free Consultation","ar":"استشارة مجانية"},"subheading":{"en":"With No Obligation","ar":"بدون أي التزام"},"formFields":[{"name":"name","label":"Your Name","type":"text","required":true},{"name":"email","label":"Email Address","type":"email","required":true},{"name":"message","label":"Your Message","type":"textarea","required":true}]}}$j$::jsonb,
 $j$[{"name":"PA Global – YG Auditors Profile","url":"https://pa-global.com/locations/egypt/yg-auditors/","description":"YG Auditors official profile on PA Global international network"},{"name":"View on Google Maps","url":"https://maps.app.goo.gl/zzPRaUH89w7HVkgR6","description":"YG-Auditors office location in Maadi, Cairo"},{"name":"GAFI – General Authority for Investment","url":"http://www.gafi.gov.eg","description":"Egyptian investment authority for business registration"},{"name":"Egyptian Tax Authority","url":"http://www.incometax.gov.eg","description":"Official Egyptian Income Tax Authority"},{"name":"Egypt Government Portal","url":"https://www.egypt.gov.eg/mobile/english/home.aspx","description":"Official Egyptian government services portal"}]$j$::jsonb)
on conflict (id) do nothing;
