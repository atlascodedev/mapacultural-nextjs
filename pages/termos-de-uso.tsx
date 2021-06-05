import React from "react";

interface Props {}

const Terms = (props: Props) => {
  return (
    <div className="flex justify-center flex-col py-10 items-center mx-8 md:mx-36 gap-10 text-left">
      <h1 className="py-5 font-black md:text-4xl text-3xl">Termos de uso</h1>

      <div className="flex flex-col gap-4 ">
        <h2 className="font-black text-xl">1. Termos</h2>
        <div>
          Ao acessar ao site Mapeamento Cultural de Taquara, concorda em cumprir
          estes termos de serviço, todas as leis e regulamentos aplicáveis ​​e
          concorda que é responsável pelo cumprimento de todas as leis locais
          aplicáveis. Se você não concordar com algum desses termos, está
          proibido de usar ou acessar este site. Os materiais contidos neste
          site são protegidos pelas leis de direitos autorais e marcas
          comerciais aplicáveis.
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-black text-xl">2. Uso de licença</h2>
        <div>
          É concedida permissão para baixar temporariamente uma cópia dos
          materiais (informações ou software) no site Mapeamento Cultural de
          Taquara , apenas para visualização transitória pessoal e não
          comercial. Esta é a concessão de uma licença, não uma transferência de
          título e, sob esta licença, você não pode: modificar ou copiar os
          materiais; usar os materiais para qualquer finalidade comercial ou
          para exibição pública (comercial ou não comercial); tentar descompilar
          ou fazer engenharia reversa de qualquer software contido no site
          Mapeamento Cultural de Taquara; remover quaisquer direitos autorais ou
          outras notações de propriedade dos materiais; ou transferir os
          materiais para outra pessoa ou 'espelhe' os materiais em qualquer
          outro servidor. Esta licença será automaticamente rescindida se você
          violar alguma dessas restrições e poderá ser rescindida por Mapeamento
          Cultural de Taquara a qualquer momento. Ao encerrar a visualização
          desses materiais ou após o término desta licença, você deve apagar
          todos os materiais baixados em sua posse, seja em formato eletrónico
          ou impresso.
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-black text-xl">3. Isenção de responsabilidade</h2>
        <div>
          Os materiais no site da Mapeamento Cultural de Taquara são fornecidos
          'como estão'. Mapeamento Cultural de Taquara não oferece garantias,
          expressas ou implícitas, e, por este meio, isenta e nega todas as
          outras garantias, incluindo, sem limitação, garantias implícitas ou
          condições de comercialização, adequação a um fim específico ou não
          violação de propriedade intelectual ou outra violação de direitos.
          Além disso, o Mapeamento Cultural de Taquara não garante ou faz
          qualquer representação relativa à precisão, aos resultados prováveis
          ​​ou à confiabilidade do uso dos materiais em seu site ou de outra
          forma relacionado a esses materiais ou em sites vinculados a este
          site.
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-black text-xl">4. Limitações</h2>
        <div>
          Em nenhum caso o Mapeamento Cultural de Taquara ou seus fornecedores
          serão responsáveis ​​por quaisquer danos (incluindo, sem limitação,
          danos por perda de dados ou lucro ou devido a interrupção dos
          negócios) decorrentes do uso ou da incapacidade de usar os materiais
          em Mapeamento Cultural de Taquara, mesmo que Mapeamento Cultural de
          Taquara ou um representante autorizado da Mapeamento Cultural de
          Taquara tenha sido notificado oralmente ou por escrito da
          possibilidade de tais danos. Como algumas jurisdições não permitem
          limitações em garantias implícitas, ou limitações de responsabilidade
          por danos conseqüentes ou incidentais, essas limitações podem não se
          aplicar a você.
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-black text-xl">5. Precisão de materiais</h2>
        <div>
          Os materiais exibidos no site da Mapeamento Cultural de Taquara podem
          incluir erros técnicos, tipográficos ou fotográficos. Mapeamento
          Cultural de Taquara não garante que qualquer material em seu site seja
          preciso, completo ou atual. Mapeamento Cultural de Taquara pode fazer
          alterações nos materiais contidos em seu site a qualquer momento, sem
          aviso prévio. No entanto, Mapeamento Cultural de Taquara não se
          compromete a atualizar os materiais.
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-black text-xl">6. Links</h2>
        <div>
          O Mapeamento Cultural de Taquara não analisou todos os sites
          vinculados ao seu site e não é responsável pelo conteúdo de nenhum
          site vinculado. A inclusão de qualquer link não implica endosso por
          Mapeamento Cultural de Taquara do site. O uso de qualquer site
          vinculado é por conta e risco do usuário.
        </div>
      </div>

      <div>
        Modificações O Mapeamento Cultural de Taquara pode revisar estes termos
        de serviço do site a qualquer momento, sem aviso prévio. Ao usar este
        site, você concorda em ficar vinculado à versão atual desses termos de
        serviço. Lei aplicável Estes termos e condições são regidos e
        interpretados de acordo com as leis do Mapeamento Cultural de Taquara e
        você se submete irrevogavelmente à jurisdição exclusiva dos tribunais
        naquele estado ou localidade.
      </div>
    </div>
  );
};

export default Terms;
