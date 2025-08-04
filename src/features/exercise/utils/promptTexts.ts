import translate from "../../translate/services/deepl"

export const translatePrompt = (passage:string, prompt:string) => {
    return `Bir metnin çevirisini gerçekçi bir puan kaybı sistemi üzerinden değerlendir. Aşağıdaki orijinal metin ve kullanıcı çevirisini karşılaştırarak 100 üzerinden bir puan ver. Puanlama 4 ana kriter üzerinden yapılmalı, her biri 25 puan değerinde. Puanlar, belirlenen hatalara göre düşürülmeli ve objektif olmalıdır.

Orijinal Metin: ${translate(passage)}

Kullanıcı Çevirisi: ${prompt}

Puanlama Kriterleri ve Puan Kaybı:

Dil Bilgisi ve Sözdizimi (25 Puan):

Puan Kaybı: Her bir dil bilgisi hatası (yanlış fiil çekimi, özne-yüklem uyumsuzluğu, zaman hatası vb.) için 3 puan düşür. Cümle yapısını bozan, okumayı zorlaştıran her hata için 5-7 puan kır.

Kelime Seçimi ve Terimler (25 Puan):

Puan Kaybı: Orijinal metindeki anahtar kelimelerin veya terimlerin yanlış çevrilmesi durumunda her bir hata için 5 puan düşür. Uygunsuz veya anlamsız kelime seçimi için her hata başına 2 puan kır.

Metnin Boyutu (50 Puan):
Kullanıcı orijinalmetnin yüzde kaçını doğru bir şekilde çevirdi?
Metnin tamamen çevrilmemiş kısımları için puan düşürülmeli.
Örnek puanlama: Metnin yarısı çevrilmişse 25, tamamı çevrilmişse 50 puan verilmeli.

Sonuç:

Her bir kriterden alınan puanı, yapılan puan kesintilerini ve bu kesintilerin nedenlerini açıkla.

Tüm kriterlerin toplamına dayanan 100 üzerinden nihai bir puan ver ve bu puanın hangi hatalar yüzünden düşük olduğunu detaylı olarak belirt.`
}

export const continuePrompt = (passage:string, prompt:string) => {
    return `Create a realistic scoring system to evaluate a user's continuation of a given text. I need you to score the user's text out of 100 based on four main criteria, each worth 25 points. The scoring should be completely objective and honest.

Original Text: ${passage}

User's Continuation: ${prompt}

Scoring Criteria:

Relevance and Coherence (25 Points):

Does the continuation logically follow the original text's plot, topic, or argument?

Does it maintain the original text's tone and style (e.g., formal, informal, narrative, expository)?

Are there any abrupt shifts in topic or contradictions with the original text?

Grammar and Syntax (25 Points):

Is the grammar in the user's text correct? Check for errors in verb tense, subject-verb agreement, and sentence structure.

Are the sentences well-formed and easy to understand?

Deduct points for each grammatical error.

Vocabulary and Word Choice (25 Points):

Does the user use a varied and appropriate vocabulary?

Are the words chosen accurately to convey the intended meaning?

Is there any repetitive or simplistic language that could be improved? Deduct points for incorrect or awkward word choices.

Flow and Naturalness (25 Points):

Does the text read naturally and fluently, as if written by a native speaker?

Are transitions between sentences and paragraphs smooth?

Does the text create a compelling or interesting continuation of the original?

Final Score Breakdown:

Provide a separate score for each of the four criteria and explain how you arrived at that score.

Finally, provide a total score out of 100 based on the sum of the four criteria, and summarize the key strengths and weaknesses of the user's continuation. `
}

export const listeningPrompt = (passage:string, prompt:string) => {
    return `Bir dinleme egzersizi için gerçekçi bir puanlama sistemi oluştur. Aşağıdaki metnin, sağlanan pasajla karşılaştırılmasını ve 100 üzerinden bir puan verilmesini istiyorum. Puanlama, 4 ana kriter üzerinden yapılmalı ve her bir kriter 25 puan değerinde olmalıdır. Puanlar, kesin bir dürüstlükle ve objektif bir şekilde verilmelidir.
Dinleme Metni: ${passage}
Kullanıcı Metni: ${prompt}
Puanlama Kriterleri:
Metnin Büyüklüğü (25 Puan):
Kullanıcı metni, dinleme metninin yüzde kaçını doğru bir şekilde yazmış?
Metnin tamamen yazılmamış kısımları için puan düşürülmeli.
Örnek puanlama: Metnin yarısı yazılmışsa 12.5, tamamı yazılmışsa 25 puan verilmeli.
Doğru Kelimeler (25 Puan):
Kullanıcı metnindeki yanlış veya eksik kelimeler tespit edilmeli.
Her yanlış veya eksik kelime için belirli bir puan düşürülmeli.
Örnek puanlama: Her yanlış kelime için 5 puan kırılmalı.
Gramer (25 Puan):
Cümle yapısındaki hatalar, fiil çekimlerindeki yanlışlar, tekil-çoğul uyumsuzlukları gibi dil bilgisi hataları tespit edilmeli.
Her bir gramer hatası için puan düşürülmeli.
Örnek puanlama: Her 1 gramer hatası için 5 puan kırılmalı.
Noktalama (25 Puan):
Eksik veya yanlış kullanılan virgül, nokta, soru işareti, noktalı virgül gibi noktalama işaretleri belirlenmeli.
Her bir noktalama hatası için puan düşürülmeli.
Örnek puanlama: Her noktalama hatası için 5 puan kırılmalı.
Sonuç:
Her bir kriter için ayrı ayrı puanları ve bu puanlamayı nasıl yaptığını açıklamalısın.
Son olarak, bu dört kriterin toplamına dayanan 100 üzerinden nihai bir puan vermeli ve bu puanın neden böyle olduğunu özetlemelisin.`
}